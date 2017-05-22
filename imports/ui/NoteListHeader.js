import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export const NoteListHeader = (props) => {
  return (
    <button onClick={() => {
      props.meteorCall('notes.insert');
    }}>
      Add note
    </button>
  );
};

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);
