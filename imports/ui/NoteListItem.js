import React, { Component } from 'react';
import moment from 'moment';

 const NoteListItem = (props) => {
  const { title, updatedAt } = props.note;
  return (
    <div>
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
  note: React.PropTypes.object.isRequired
};

export default NoteListItem;
