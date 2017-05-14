import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';


const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Accounts.logout()} >Log out</button>
      </div>
    </div>
  )
}

export default PrivateHeader;

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

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};
