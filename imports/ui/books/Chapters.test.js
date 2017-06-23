import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { Chapters } from './Chapters';

import { books } from '../../fixtures/fixtures';


if(Meteor.isClient){
  describe('Chapters', function(){
    let browserHistory;
    let call;

    beforeEach(function(){
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should show no selected book if no book provided', function(){
      const wrapper = mount(<Chapters book={{}} />);
      expect(wrapper.find('p').text()).toBe('Pick or add book');
    });

    it('should show the title of the selected book' , function() {
      const wrapper = mount(<Chapters book={books[0]} selectedBookId={books[0]._id}/>);
      expect(wrapper.find('h2').text()).toBe(books[0].title);
      //
      // expect(wrapper.find('BookListItem').length).toBe(2);
      // expect(wrapper.find('ListEmptyItem').length).toBe(0);
    });

    it('should show the chapters in a select menu if more than one chapter for a book', function() {
      const wrapper = mount(<Chapters book={books[0]} selectedBookId={books[0]._id}/>);
      expect(wrapper.find('option').at(0).text()).toBe('Chapter 1');
    });

    it('should show no chapters if no chapters for a book', function() {
      const wrapper = mount(<Chapters book={books[2]} selectedBookId={books[2]._id}/>);
      expect(wrapper.find('option')).toNotExist();
    });

    it('should show no chapters if no chapters for a book', function() {
      const wrapper = mount(<Chapters book={books[2]} selectedBookId={books[2]._id}/>);

    });

  });
}
