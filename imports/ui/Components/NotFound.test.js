import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import React from 'react';
import expect from 'expect';

import NotFound from './NotFound';

if(Meteor.isClient){
  describe('NotFound', function(){
    it('should have a titel with not found', function(){
      const wrapper = mount(<NotFound />);
      expect(wrapper.find('h1').text()).toBe('Page not found');
    });
  });
}
