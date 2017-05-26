import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessino } from 'meteor/session';

export const PrivateHeader = (props) => {

  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImageSrc} />
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLogout()} >Log out</button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  isNavOpen: React.PropTypes.bool.isRequired,
  handleNavToggle: React.PropTypes.func.isRequired
};

// this is created in production
export default createContainer(()=> {
  return {
    handleLogout: () => Accounts.logout(),
    isNavOpen: Session.get('isNavOpen'),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen'))
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
