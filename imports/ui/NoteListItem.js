import React, { Component } from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

 export const NoteListItem = (props) => {
  const { title, updatedAt, _id } = props.note;
  return (
    <div onClick={()=> { props.Session.set('selectedNoteId', _id ) }}>
      <h5>
        {title || 'Untitled note'}
      </h5>
      <p>
        { moment(updatedAt).format('YYYY-MM-DD') }
      </p>
    </div>
  )
};

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session }
}, NoteListItem);
