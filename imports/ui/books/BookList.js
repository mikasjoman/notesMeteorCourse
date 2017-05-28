import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Books } from '../../api/books';

//import NoteListHeader from './NoteListHeader';
// import NoteListItem from './NoteListItem';
// import NoteListEmptyItem from './NoteListEmptyItem';
//
// const renderNotes = (notes) => {
//   if(notes.length > 0){
//     return notes.map((note) => {
//       return  <NoteListItem key={note._id} note={note} />;
//     });
//   }
//   return <NoteListEmptyItem />;
// }

export const NoteList = (props) => {
  return (
    <div className="item-list">
      No of books: {props.books.length}
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('books');

  return {
    books: Books.find({}).fetch(),
    selectedNoteId
  }
}, NoteList);
