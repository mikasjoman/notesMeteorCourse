import { Meteor } from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';

// overrride and set a standard error message using meteors built it in
SimpleSchema.defineValidationErrorTransform((e)=> {
  return new Meteor.Error(400, e.message);
});
