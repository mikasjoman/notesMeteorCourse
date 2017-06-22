import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteList } from './NoteList';

import { notes } from '../../fixtures/fixtures';


if(Meteor.isClient){
  describe('NotesList', function(){
    it('should show render NoteListItem for each Note', function(){
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('ListEmptyItem').length).toBe(0);
    });

    it('should show NoteListEmptyItem if no notes provided', function(){
      const empty = [];
      const wrapper = mount(<NoteList notes={empty} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('ListEmptyItem').length).toBe(1);
      expect(wrapper.find('ListEmptyItem').text()).toBe('You do not have any notes yet');
    });

  });
}
