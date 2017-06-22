import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { AddBook } from './AddBook';
import { books } from '../../fixtures/fixtures';

if (Meteor.isClient) {
  describe('AddBook', function(){

    let meteorCall;
    let Session;
    beforeEach(function(){
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      };
    })

    it('should open a form when clicking the Add new book button with form and cancel button', function(){

      const wrapper = mount(<AddBook meteorCall={meteorCall} Session={Session} />);
      expect(wrapper.state('showForm')).toBe(false);
      wrapper.find('button').simulate('click');
      expect(wrapper.state('showForm')).toBe(true);
      expect(wrapper.find('form')).toExist();
      expect(wrapper.find('h2').text()).toBe('Add new book');
      expect(wrapper.find('button-secondary')).toExist();
      // meteorCall.calls[0].arguments[1](undefined, books[0]._id);
      // expect(meteorCall.calls[0].arguments[0]).toBe('books.insert');
      // expect(Session.set).toHaveBeenCalledWith('selectedNoteId', books[0]._id);
    });

    it('should close the form if clicking cancel', function(){
      const wrapper = mount(<AddBook meteorCall={meteorCall} Session={Session} />);
      expect(wrapper.state('showForm')).toBe(false);
      wrapper.find('button').simulate('click');
      expect(wrapper.state('showForm')).toBe(true);
      expect(wrapper.find('h2').text()).toBe('Add new book');
      expect(wrapper.find('button button-secondary')).toExist();
      wrapper.find('#cancelBtn').simulate('click');
      expect(wrapper.state('showForm')).toBe(false);
    });

    it('should call meteorCall on saving form', function(){
      const wrapper = mount(<AddBook meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      wrapper.find('#book_title').simulate('change', {target: {value: 'My Book 1'}});
      // const fieldChanges = { no_chapters: 10, no_pages: 300, title: 'My first book'};
      // wrapper.setState(fieldChanges);

      wrapper.find('#new_book_or_save_btn').simulate('click');

      meteorCall.calls[0].arguments[2](undefined, books[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('books.insert');
      // expect(meteorCall.calls[0].arguments[1]).toBe(fieldChanges);
      expect(Session.set).toHaveBeenCalledWith('selectedBookId', books[0]._id);
    });

    it('should not set session on failing saving form', function(){
      const wrapper = mount(<AddBook meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      wrapper.find('#book_title').simulate('change', {target: {value: 'My Book 1'}});
      wrapper.find('#new_book_or_save_btn').simulate('click');

      meteorCall.calls[0].arguments[2](undefined, undefined);

      expect(Session.set).toNotHaveBeenCalled();
    });

    // it('should show error msg when saving and not having a title', function(){
    //   const wrapper = mount(<AddBook meteorCall={meteorCall} Session={Session} />);
    //   wrapper.find('button').simulate('click');
    //
    // });

    // it('should not set session for a failed insert', function(){
    //   const wrapper = mount(<AddBook meteorCall={meteorCall} Session={Session} />);
    //
    //   wrapper.find('button').simulate('click');
    //   meteorCall.calls[0].arguments[1](undefined, undefined);
    //   expect(Session.set).toNotHaveBeenCalled();
    //
    // });


  });
}
