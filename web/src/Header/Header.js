import React, { Component } from 'react';

import LoginLogout from './LoginLogout';
import './Header.css'

class Header extends Component {

  render() {
    return (
      <nav className="header">
          <a className="header-title" href="/">Scoreboard</a>
          <LoginLogout {...this.props} />
      </nav>
    )
  }

}

export default Header;
