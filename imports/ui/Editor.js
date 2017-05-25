import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';

export class Editor extends Component {

  handleBodyChange(event) {
    this.props.call('notes.update', this.props.note._id, {
      body: event.target.value
    })
  }
  handleTitleChange(event) {
    this.props.call('notes.update', this.props.note._id, {
      title: event.target.value
    })
  }

  renderEditor() {
    const { body, title } = this.props.note;
    return (
      <div>
        <input
          value={title}
          onChange={this.handleTitleChange.bind(this)}
          placeholder="Untitled note title"
        />
        <textarea
          value={body}
          onChange={this.handleBodyChange.bind(this)}
          placeholder="Your note here..."></textarea>
        <button>Delete note</button>
      </div>
    )
  }

  render() {
    if(this.props.note){
      return this.renderEditor();
    }else {
      return <p>{this.props.selectedNoteId ? 'Note note found': 'Pick or create a note to get started'} </p>;
    }
  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };

}, Editor);
