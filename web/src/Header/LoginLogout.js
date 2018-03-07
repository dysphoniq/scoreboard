import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class LoginLogout extends Component {

  constructor(props) {
    super(props);

    this.isAuthenticated = this.props.isAuthenticated.bind(this);
    this.login = this.props.login.bind(this);
    this.logout = this.props.logout.bind(this);
  }

  isLoggedIn() {
    return this.isAuthenticated() && !!this.props.profile;
  }

  render() {

    const userDisplay = this.isLoggedIn()
      ? (
        <span className="profile-link">
          <Link to="/Profile">{this.props.profile.name}</Link>
        </span>
      ) : null;

    const loginLogoutButton = this.isLoggedIn()
      ? (
        <button className="button" onClick={this.logout}>
          Log Out
        </button>
      ) : (
        <button className="button" onClick={this.login}>
          Log In
        </button>
      );

    return (
      <div className="login-logout">
        {userDisplay}

        <span className="login-logout-button">
          {loginLogoutButton}
        </span>
      </div>
    )
  }
}

export default LoginLogout;
