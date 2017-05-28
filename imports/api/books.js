import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';


export const Books = new Mongo.Collection('books');

if(Meteor.isServer){
  Meteor.publish('books', function(){
    return Books.find({ userId: this.userId });
  });
}

Meteor.methods({

  'books.insert'(book) {
    if(!this.userId) throw new Meteor.Error('not-authorized');
    validateNewBook(book);
    Books.insert({userId: this.userId, ...book});
  },

  'books.update'(_id, updates){
    if(!this.userId) throw new Meteor.Error('not-authorized');
    validateUpdateBook(_id, updates);
    return Books.update({
      _id
    }, {
      $set: {
        ...updates
      }
    });
  },

  'books.remove'(_id){
    if(!this.userId) throw new Meteor.Error('not-authorized');
    validateRemove(_id);
    return Books.remove({_id, userId: this.userId});
  }
});

const validateNewBook = (book) => {
  new SimpleSchema({
    title: {
      type: String,
      min: 2
    },
    no_chapters: {
      type: Number,
      optional: true
    },
    no_pages: {
      type: Number,
      optional: true
    },
    userId: {
      type: String
    }
  }).validate(book);
}

const validateUpdateBook = (_id, updates) => {
  new SimpleSchema({
    _id: {
      type: String,
      min: 1,
    },
    title: {
      type: String,
      min: 1,
      optional: true
    },
    no_chapters: {
      type: Number,
      optional: true
    }
  }).validate({_id, ...updates});
}

const validateRemove = (_id) => {
  new SimpleSchema({
    _id: {
      type: String,
      min: 1
    }
  }).validate({_id});
}
