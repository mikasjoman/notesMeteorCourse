import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Tabs from './Components/Tabs';
import { browserHistory } from 'react-router';

const TAB_LIST = [
  { url: '/notes', title: 'Notes'},
  { url: '/books', title: 'Books'}
];

const renderLogoutBtn = (props) => {
  if(props.isSignedIn){
    return <button className="button button--link-text" onClick={() => props.handleLogout()} >Log out</button>;
  }
}

export const PrivateHeader = (props) => {

  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImageSrc} />
        <Tabs tabList={TAB_LIST} />
        {renderLogoutBtn(props)}
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  handleLogout: React.PropTypes.func.isRequired,
  isNavOpen: React.PropTypes.bool.isRequired,
  handleNavToggle: React.PropTypes.func.isRequired,
  isSignedIn: React.PropTypes.bool.isRequired
};

// this is created in production
export default createContainer(()=> {
  return {
    handleLogout: () => { Accounts.logout(); browserHistory.replace('/');},
    isNavOpen: Session.get('isNavOpen'),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isSignedIn: !!Meteor.userId()
  };
}, PrivateHeader);

// export default class PrivateHeader extends Component {
//
//   logOut(){
//     Accounts.logout();
//   }
//
//   render() {
//     return(
//       <div>
//         <h1>{this.props.title}</h1>
//         <button onClick={this.logOut} >Log out</button>
//       </div>
//     );
//   }
// }
