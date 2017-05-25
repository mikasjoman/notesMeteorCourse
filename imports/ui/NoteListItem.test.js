import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import moment from 'moment';

import { NoteListItem } from './NoteListItem';

import { notes } from '../fixtures/fixtures';

if(Meteor.isClient) {
  describe('NoteListItem', function(){

      let Session;

      beforeEach(() => {
        Session = {
          set: expect.createSpy()
        };
      });

      it('should render title and timestamp', function(){
        const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
        let updatedAt = moment(notes[0].updatedAt).format('YYYY-MM-DD')
        console.log(updatedAt)
        expect(wrapper.find('h5').text()).toBe(notes[0].title);
        expect(wrapper.find('p').text()).toBe(updatedAt);
      });

      it('should render Undefined title if not set in db', function(){
        const wrapper = mount(<NoteListItem note={notes[1].updatedAt} Session={Session} />);
        expect(wrapper.find('h5').text()).toBe('Untitled note');
      });

      it('should call set on click', function(){
        const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
        wrapper.find('NoteListItem').simulate('click');
        expect(Session.set).toHaveBeenCalledWith('selectedNoteId',notes[0]._id);

      });
  });
};
