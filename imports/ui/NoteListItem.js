import React, { Component } from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';


export class NoteListItem extends Component {
  render() {
    const className = this.props.note.selected ? 'item item--selected' : 'item';
    const { title, updatedAt, _id } = this.props.note;
    return (
      <div className={className} onClick={()=> { this.props.Session.set('selectedNoteId', _id ) }}>
        <h5 className="item__title">
          {title || 'Untitled note'}
        </h5>
        <p className="item__subtitle">
          { moment(updatedAt).format('YYYY-MM-DD') }
        </p>
      </div>
    );
  }
}

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session }
}, NoteListItem);
