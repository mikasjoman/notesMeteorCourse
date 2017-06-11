import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Books } from '../../api/books';

import BookListItem from './BookListItem';

const renderBooks = (books) => {
  return books.map((book) => {
    if ( book._id ) return <BookListItem key={book._id} book={book}/>;
    return 'No books in list'
  });
}

export const BookList = (props) => {
  return (
    <div className="item-list">
      { renderBooks(props.books) }
    </div>
  );
};

BookList.propTypes = {
  books: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedBookId = Session.get('selectedBookId');
  Meteor.subscribe('books');

  return {
    books: Books.find({}).fetch(),
    selectedBookId
  }
}, BookList);
