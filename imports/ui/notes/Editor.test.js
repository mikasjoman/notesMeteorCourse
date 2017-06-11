import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';

import { notes } from '../../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', function(){
    let browserHistory;
    let call;

    beforeEach(function(){
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick note message', function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started');
    });

    it('should render render note not found if no note is passed in', function(){
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} browserHistory={browserHistory} call={call}/>);
      expect(wrapper.find('p').text()).toBe('Note note found');
    });

    it('should remove a note when clicking remove btn', function(){
      const wrapper = mount(<Editor
          note={notes[0]}
          selectedNoteId={notes[0]._id}
          browserHistory={browserHistory}
          call={call}
        />);
      wrapper.find('button').simulate('click');
      expect(call).toHaveBeenCalled();
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('notes');
    });

    it('should update the note body on text area change', function(){
      const wrapper = _mountEditorWithAllPropsFilledOut(call, browserHistory, notes[0]);
      const newBody = 'new body text';
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });
      expect(wrapper.state('body')).toBe(newBody)
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
    });

    it('should update the note title on text area change', function(){
      const wrapper = _mountEditorWithAllPropsFilledOut(call, browserHistory, notes[0]);
      const newTitle = 'new title text';
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });
      expect(wrapper.state('title')).toBe(newTitle)
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
    });

    it('should set state for new note', function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });
      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not set state if no note prop provided', function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });
      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });


  });
}

const _mountEditorWithAllPropsFilledOut = (call, browserHistory, note) => {
  return mount(<Editor
      note={note}
      selectedNoteId={note._id}
      browserHistory={browserHistory}
      call={call}
    />);
}
