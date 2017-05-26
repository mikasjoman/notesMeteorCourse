import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
  return (
    <button onClick={() => {
      props.meteorCall('notes.insert', (err, resp) => {
        if(resp){
          props.Session.set('selectedNoteId', resp);
        }
      });
    }}>
      Add note
    </button>
  );
};

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, NoteListHeader);
