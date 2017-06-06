import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import Books from '../../api/books';

export class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      title: '',
      error: ''
    };
  }

  saveBook() {
    const { title, no_chapters, no_pages } = this.state;
    let book = { title, no_chapters: parseInt(no_chapters), no_pages: parseInt(no_pages) };
    console.log('the book is...');
    console.log(book);
    this.props.meteorCall('books.insert', book, (error, resp) => {

      if(error){
        console.log('Could not save the book', error);
        this.setState({ error });
      }else{
        console.log('Successfully saved the book');
        this.setState({ showForm: false, error: '' });
      }
    });
  }

  renderAddBookBtn() {
      return (
        <button
          className="button"
          onClick={() => {
            if(!this.state.showForm){
              this.setState({ showForm: !this.state.showForm });
            }else{
              this.saveBook();
            }
        }}>
          { this.state.showForm ? 'Save new book' : 'Add book +'}
        </button>
      );
  }
  handleFormChange(event) {
    let value = event.target.value;
    const name = event.target.name;
    const numberFields = ['no_pages', 'no_chapters'];
    if (numberFields.indexOf(name) > -1) {
      value = Number(value);
    }
    this.setState({ [name] : value }); // handles multiple input fields in the form using this handler
    console.log('state now ', this.state);
  }

  renderForm() {
    return(

        <form>
          <h2>Add new book</h2>
          <input
            autoFocus
            className="form__input"
            value={this.state.title}
            name="title"
            onChange={this.handleFormChange.bind(this)}
            placeholder="Book title"
          />
          <input
            className="form__input"
            value={this.state.no_chapters}
            name="no_chapters"
            type="number"
            min="1"
            max="200"
            style={{minWidth: 200}}
            onChange={this.handleFormChange.bind(this)}
            placeholder="No of chapters"
          />
          <input
            className="form__input"
            value={this.state.no_pages}
            name="no_pages"
            type="number"
            min="1"
            max="5000"
            style={{minWidth: 200}}
            onChange={this.handleFormChange.bind(this)}
            placeholder="No of pages"
          />
          <button className="button button-secondary" onClick={() => this.setState({ showForm: !this.state.showForm })}>
            Cancel
          </button>
        </form>

    );
  }

  render() {
    return (
      <div className="item-list__header">
        { this.state.showForm ? this.renderForm() : undefined }
        { this.renderAddBookBtn() }
      </div>
    );
  }
}

AddBook.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, AddBook);
