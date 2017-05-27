import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import Tabs from './Tabs';

if(Meteor.isClient){
  describe('Tabs', function() {
    it('should render a tab if one is provided', function(){
        const oneTabOnly = [{url: '/mika', title: 'Mika'}];
        const wrapper = mount(<Tabs tabList={oneTabOnly} />);
        const tab = wrapper.find('a').text();
        expect(tab).toBe(oneTabOnly[0].title);
    });

    it('should render multiple tabs if several are provided', function(){
        const multipleTabs = [{url: '/mika', title: 'Mika'}, {url: '/johanna', title: 'Johanna'}, {url: '/admin', title: 'admin'}];
        const wrapper = mount(<Tabs tabList={multipleTabs} />);
        const firstTab = wrapper.find('a').first().text();
        expect(firstTab).toBe(multipleTabs[0].title);
        const tabs = wrapper.find('Link');
        expect(tabs.length).toEqual(multipleTabs.length);
    });
  });
}
