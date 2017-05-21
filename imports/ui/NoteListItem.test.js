import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

const updatedAt = 'Sun May 21 2017 21:54:51 GMT+0200 (CEST)';

if(Meteor.isClient) {
  describe('NoteListItem', function(){
      it('should render title and timestamp', function(){
        const title ='my title';
        const wrapper = mount(<NoteListItem note={{title, updatedAt}} />);

        expect(wrapper.find('h5').text()).toBe(title);
        expect(wrapper.find('p').text()).toBe('2017-05-21');
      });

      it('should render Undefined title if not set in db', function(){
        const wrapper = mount(<NoteListItem note={{updatedAt}} />);
        expect(wrapper.find('h5').text()).toBe('Untitled note');
      });
  });
};
