import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

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
    <div className="item-list">
      <NoteListHeader />
      <FlipMove maintainContainerHeight={true}>
        { renderNotes(props.notes) }
      </FlipMove>
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
