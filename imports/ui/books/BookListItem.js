import React, { Component } from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';


export class BookListItem extends Component {

  render() {
    const className = this.props.book.selected ? 'item item--selected' : 'item';
    const { title, updatedAt, _id } = this.props.book;
    return (
      <div className={className} onClick={()=> { this.props.Session.set('selectedBookId', _id ) }}>
        <h5 className="item__title">
          {title || 'Untitled book'}
        </h5>
        <p className="item__subtitle">
          { moment(updatedAt).format('YYYY-MM-DD') }
        </p>
      </div>
    );
  }
}

BookListItem.propTypes = {
  book: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session }
}, BookListItem);
