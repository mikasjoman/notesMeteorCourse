import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import moment from 'moment';

import { BookListItem } from './BookListItem';

import { books } from '../../fixtures/fixtures';

if(Meteor.isClient) {
  describe('BookListItem', function(){

      let Session;

      beforeEach(() => {
        Session = {
          set: expect.createSpy()
        };
      });

      it('should render title and timestamp', function(){
        const wrapper = mount(<BookListItem book={books[0]} Session={Session}/>);
        let updatedAt = moment(books[0].updatedAt).format('YYYY-MM-DD')
        expect(wrapper.find('h5').text()).toBe(books[0].title);
        expect(wrapper.find('p').text()).toBe(updatedAt);
      });

      it('should call set on click', function(){
        const wrapper = mount(<BookListItem book={books[0]} Session={Session}/>);
        wrapper.find('BookListItem').simulate('click');
        expect(Session.set).toHaveBeenCalledWith('selectedBookId',books[0]._id);
      });
  });
};
