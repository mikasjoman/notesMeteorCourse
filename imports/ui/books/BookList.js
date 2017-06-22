import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Books } from '../../api/books';

import BookListItem from './BookListItem';
import ListEmptyItem from '../Components/ListEmptyItem';

const renderBooks = (books) => {
  if ( books.length < 1 ) return <ListEmptyItem type="books"/>;

  return books.map((book) => {
    if ( book._id ) return <BookListItem key={book._id} book={book}/>;
  });
}

export const BookList = (props) => {
  return (
    <div className="item-list">
      <FlipMove maintainContainerHeight={true}>
        { renderBooks(props.books) }
      </FlipMove>
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

    books: Books.find({}, { sort: { updatedAt: -1 }}).fetch().map( book => {
      return { ...book, selected: book._id === selectedBookId ? true : false }
    }),
    selectedBookId
  }
}, BookList);
