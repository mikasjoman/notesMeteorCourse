import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

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
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 }}).fetch().map(note => {
      return {...note, selected: note._id == selectedNoteId? true : false };
    }),
    selectedNoteId
  }
}, NoteList);
