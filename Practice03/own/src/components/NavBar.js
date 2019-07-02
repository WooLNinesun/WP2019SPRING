import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-end">
              <a className="navbar-item is-active">Blog</a>
              <a className="navbar-item">About</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
