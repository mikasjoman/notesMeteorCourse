import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import { browserHistory } from 'react-router';

export class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }

  handleBodyChange(event) {
    const body = event.target.value;
    this.setState({ body })
    this.props.call('notes.update', this.props.note._id, { body });
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }

  handleRemoveNote() {
    const { call, browserHistory } = this.props;
    call('notes.remove', this.props.note._id);
    browserHistory.push('dashboard');
  }

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      const { title, body } = this.props.note;
      this.setState({ title, body });
    }
  }

  renderEditor() {
    const { body, title } = this.props.note;
    return (
      <div>
        <input
          value={this.state.title}
          onChange={this.handleTitleChange.bind(this)}
          placeholder="Untitled note title"
        />
        <textarea
          value={this.state.body}
          onChange={this.handleBodyChange.bind(this)}
          placeholder="Your note here..."></textarea>
        <button onClick={this.handleRemoveNote.bind(this)}>Delete note</button>
      </div>
    )
  }

  render() {
    if(this.props.note){
      return this.renderEditor();
    }else {
      return <p>{this.props.selectedNoteId ? 'Note note found': 'Pick or create a note to get started'}</p>;
    }
  }
}

Editor.propTypes = {
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired,
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };

}, Editor);
