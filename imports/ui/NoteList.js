import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

const renderNotes = (notes) => {
  if(notes.length > 0){
    return notes.map((note) => {
      return  <NoteListItem key={note._id} note={note} />;
    });
  }
  return <NoteListEmptyItem />;
}

export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader />
      { renderNotes(props.notes) }
      NoteList
      { props.notes.length }
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  }
}, NoteList);
