
import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(event){
    event.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    this.props.loginWithPassword({email}, password, (error)=> {
      if(error){
        this.setState({ error: error.reason});
      }else{
        this.setState({error: ''});
      }
    });
  }

  render() {
    let { error } = this.state;
    return(
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Notes & Books app</h1>
            <h5>{error ? <p>{error}</p> : null}</h5>
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
              <input id="emailInput" type="email" ref="email" name="email" placeholder="Email" />
              <input id="passwordInput" type="password" ref="password" name="password" placeholder="Password" />
              <button id="submitLoginBtn" className="button" type="submit">Login to account</button>
            </form>
            <Link to="/signup">Signup to a new account</Link>
          </div>
        </div>
    );
  }
}

Login.PropTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
};

export default createContainer(()=> {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);
