import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { BookList } from './BookList';

import { books } from '../../fixtures/fixtures';


if(Meteor.isClient){
  describe('BookList', function(){
    it('should show render BookListItem for each Note', function(){
      const wrapper = mount(<BookList books={books} />);

      expect(wrapper.find('BookListItem').length).toBe(2);
      expect(wrapper.find('ListEmptyItem').length).toBe(0);
    });

    it('should show ListEmptyItem if no books provided', function(){
      const empty = [];
      const wrapper = mount(<BookList books={empty} />);

      expect(wrapper.find('BookListItem').length).toBe(0);
      expect(wrapper.find('ListEmptyItem').length).toBe(1);
      expect(wrapper.find('ListEmptyItem').text()).toBe('You do not have any books yet');
    });

  });
}
