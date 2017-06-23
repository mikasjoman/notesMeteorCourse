import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Books } from '../../api/books';
export class Chapters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedChapter: undefined
    };
  }

  renderBookTitle() {
    return <h2>{this.props.book.title}</h2>;
  }

  handleSelectedChapter(e) {
     this.setState({ selectedChapter :e.target.value});
  }

  renderChapterSelectMenu() {
    if(this.props.book.chapters < 1) return <p>No chapters for book</p>;

    const chapters = Array.from(Array(this.props.book.no_chapters).keys()).map(numb => numb + 1);
     return (
       <select
         value={this.state.selectedChapter}
         onChange={this.handleSelectedChapter.bind(this)}
       >
        {chapters.map(chapter => {
          return <option value={chapter}>Chapter {chapter}</option>
        })}
       </select>
    )
  }

  render() {
    if(!this.props.selectedBookId || !this.props.book) return <p>Pick or add book</p>;
    const { book } = this.props;
    return (
      <div className="editor">
        { this.renderBookTitle() } <p> { book.no_pages } pages</p>
        { this.renderChapterSelectMenu() }
      </div>
    );
  }
}


Chapters.propTypes = {
  book: React.PropTypes.object,
  selectedBookId : React.PropTypes.string
}

export default createContainer (()=> {
  const selectedBookId = Session.get('selectedBookId');
  return {
    book : Books.findOne(selectedBookId),
    selectedBookId
  }

}, Chapters);
