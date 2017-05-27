import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// observe the import is different from when importing it from other files
import { PrivateHeader } from './PrivateHeader';

if(Meteor.isClient){
  describe('PrivateHeader', function(){
      beforeEach(() => {
        Session = {
          set: expect.createSpy()
        };
      });

      it('should set button text to logout', function(){
        const wrapper = mount(<PrivateHeader isSignedIn={true} handleNavToggle={()=>{}} isNavOpen={false} handleLogout={()=>{}} />);
        wrapper.setProps({ isSignedIn: true});
        const buttonText = wrapper.find('button').text();

        expect(buttonText).toBe('Log out');
      });

      it('should show tab with title Notes', function(){
        const title = 'Notes';
        const wrapper = mount(<PrivateHeader isSignedIn={true} handleNavToggle={()=>{}} isNavOpen={false} handleLogout={()=>{}} />);
        const titleText = wrapper.find('a').first().text();
        expect(titleText).toBe(title);
      });


      it('should call handleLogout on click', function(){
        const spy = expect.createSpy();
        const wrapper = mount(<PrivateHeader isSignedIn={true} handleNavToggle={()=>{}} isNavOpen={false} handleLogout={spy}/>);
        wrapper.setProps({ isSignedIn: true});
        wrapper.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
      });

  });
}
