import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if(Meteor.isServer){
  describe('Notes', function(){


    const noteOne = {
      _id: 'testNoteId1',
      title: 'hello',
      body: 'my body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'hello note 2 user',
      body: 'my body for note count',
      updatedAt: 0,
      userId: 'testUserId2'
    };


    beforeEach(function(){
      // Mocha life cycle method
      Notes.remove({}); // only used on a test db copy
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function(){
      const userId = 'mika';
      const _id = Meteor.server.method_handlers['notes.insert']
        .apply({ userId });

      expect(Notes.findOne({ _id, userId})).toExist();
    });

    it('should not insert a note if not authenticated', function(){
      expect(() => {
        const _id = Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove a note', function(){

      Meteor.server.method_handlers['notes.remove']
        .apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne.userId})).toNotExist();
    });

    it('should not remove notes if unathenticated', function(){

      expect(() => {
        Meteor.server.method_handlers['notes.remove']
        .apply({}, [noteOne._id]);
      }).toThrow();

      expect(Notes.findOne({ _id: noteOne._id})).toExist();
    });

    it('should not remove a note if there is an invalid id', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.remove']
          .apply({ userId: noteOne.userId }, []);
      }).toThrow();
      expect(Notes.findOne({ _id: noteOne._id })).toExist();
    });

    it('should update note', function(){
      const dataToUpdate = {
        title: 'My new title'
      };

      Meteor.server.method_handlers['notes.update']
        .apply({
          userId: noteOne.userId
        }, [noteOne._id, dataToUpdate] );

      const note = Notes.findOne( noteOne._id );
      expect(note.updatedAt).toBeGreaterThan(noteOne.updatedAt);
      expect(note).toInclude({
        title: dataToUpdate.title,
        body: noteOne.body
      });

    });

    it('should thorw error if extra updates', function(){
      // expect some fn to throw
      const erroniousDogYearData = {
        title: 'My thing',
        dogYears: 33
      };
      expect(() => {
        Meteor.server.method_handlers['notes.update']
          .apply(
            { userId: noteOne.userId},
            [noteOne._id, erroniousDogYearData]
          );
      }).toThrow();

    });


    it('should not update a note if the user was not the creator', function(){
      const dataToUpdate = {
        title: 'My new title'
      };

      Meteor.server.method_handlers['notes.update']
        .apply({
          userId: 'randomFalseId333'
        }, [noteOne._id, dataToUpdate] );

      const note = Notes.findOne( noteOne._id );
      expect(note.updatedAt).toEqual(noteOne.updatedAt);
      expect(note).toInclude(noteOne);
    });

    it('should not update a note if unathenticated', function(){
      expect(()=> {
        Meteor.server.method_handlers['notes.update']
          .apply({}, [noteOne._id, { title: 'Hello'} ]); // no userId provided
      }).toThrow();
      const note = Notes.findOne({_id: noteOne._id});
      expect(note).toEqual(noteOne);
    });

    it('should not update a note if there is a invalid db _id', function(){
      expect(()=> {
        Meteor.server.method_handlers['notes.update']
          .apply({
            userId: noteOne.userId
          }, [
            _id: 'errorData2223',
            { title: 'New title'}
          ]);
      }).toThrow();
    });

    it('should return a users notes from the pulblicaction', function(){
      const result = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId});
      const notes = result.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return zero notes user that has none', function(){
      const result = Meteor.server.publish_handlers.notes.apply({ userId: 'bullshitId11'});
      expect(result.fetch().length).toBe(0);
    })
  });
}
