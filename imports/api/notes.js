import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer){
  Meteor.publish('notes', function(){ // use fn not arrow
    return Notes.find({ userId: this.userId });
  })
}

Meteor.methods({
  'notes.insert'() {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },

  'notes.remove'(_id) {
    if(!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    validateIDIsLongerThanOne(_id);
    return Notes.remove({ _id, userId: this.userId });
  },

  'notes.update'(_id, updates) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    validateUpdateInputs(_id, updates);
    Notes.update({
      _id,
      userId: this.userId
    },
    {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    })
  }
});


const validateUpdateInputs = (_id, updates) => {
  new SimpleSchema({
    _id: {
      type: String,
      min: 1
    },
    title: {
      type: String,
      optional: true
    },
    body: {
      type: String,
      optional: true
    }
  }).validate({
    _id,
    ...updates
  });
}

const validateIDIsLongerThanOne = (_id) => {
  new SimpleSchema({
    _id: {
      type: String,
      min: 1
    }
  }).validate({ _id });
}
