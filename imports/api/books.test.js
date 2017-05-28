import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Books } from './books';

if(Meteor.isServer){
  describe('Books', function(){

    const bookOne = {
      _id: 'book1',
      title: 'Med 1',
      no_chapters: 11,
      no_pages: 1,
      userId: 'mika22'
    };

    var bookTwo = {
      _id: 'book2',
      title: 'Med 2',
      no_chapters: 0,
      no_pages: 22,
      userId: 'mika33'
    };

    beforeEach(function(){
      Books.remove({});
      Books.insert(bookOne);
    });

    describe('books.insert tests', function(){
      it('should exist a book in the db after Before fn', function(){
        expect(Books.findOne({_id: bookOne._id})).toExist();
      });

      it('should be able to add a second book', function(){
        expect(() => {
          delete bookTwo['_id'];
          Meteor.server.method_handlers['books.insert']
              .apply({userId: bookTwo.userId},
              [bookTwo]);
        }).toNotThrow();
        expect(Books.find().fetch().length).toEqual(2);
      });

      it('should not be able to add a book if not signed in', function(){
        expect(()=> {
          Meteor.server.method_handlers['books.insert']
            .apply({}, [bookTwo]);
        }).toThrow();
        expect(Books.find().fetch().length).toEqual(1);
      });

      it('should not be able to add a book with falsy data', function(){
        expect(()=> {
          Meteor.server.method_handlers['books.insert']
            .apply({ userId: bookTwo.userId},
            [{title: 'My book', bullshitData: 'yey'}]);
        }).toThrow();

      });
    });

    describe('books.update test', function(){
      it('should be able to update an existing record', function(){
        Meteor.server.method_handlers['books.update']
          .apply({ userId: bookOne.userId},
          [bookOne._id, {title: 'My holy book'}]);
      });
      it('should throw an error when updating if not signed in', function(){
        expect(()=> {
          Meteor.server.method_handlers['books.update']
            .apply({userId: null}, [bookOne._id, {title: 'hey'}]);
        }).toThrow();
      });
      it('should throw an error if updating with no update data', function(){
        expect(()=> {
          Meteor.server.method_handlers['books.update']
            .apply({ userId: bookOne.userId},
            [bookOne._id, {}]);
        }).toThrow();

        expect(Books.findOne(bookOne._id)).toEqual(bookOne);
      });
      it('should not be able toupdate with keys that are not specified', function(){
        expect(()=> {
          Meteor.server.method_handlers['books.update']
            .apply({ userId: bookOne.userId},
            [bookOne._id, {userName: 'lovekit'}]);
        }).toThrow();
      });
    });

    describe('books.remove tests', function(){
      it('should be able to remove a book', function(){
          Meteor.server.method_handlers['books.remove']
            .apply({userId: bookOne.userId}, [bookOne._id]);
          expect(Books.findOne({})).toNotExist();
      });

      it('should not be able to remove a book if not signed in', function(){
        expect(()=> {
          Meteor.server.method_handlers['books.remove']
            .apply({}, [bookOne._id]);
        }).toThrow()
      });

      it('should not be able to remove a db entry if no _id is provided', function(){
        expect(()=> {
          Meteor.server.method_handlers['books.remove']
            .apply({ userId: bookOne }, []);
        }).toThrow();
      });
    });

    describe('Book publications', function(){
      it('should return at least one book', function(){
        const books = Meteor.server.publish_handlers.books
          .apply({ userId: bookOne.userId});
        expect(books.fetch().length).toBeGreaterThan(0);
      });

      it('should return zero books if the user doesnt have any books', function(){
        const result = Meteor.server.publish_handlers.books.apply({ userId: 'mika1'});
        expect(result.fetch().length).toBe(0);
      });

      it('should be zero if tries to publish with no username', function(){
        const result = Meteor.server.publish_handlers.books.apply({});
        expect(result.fetch().length).toBe(0);
      })

    });

  });// end Book describe
}
