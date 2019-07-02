import React, { Component } from 'react';
import NavBar from './NavBar';

class Header extends Component {
  render() {
    return (
      <header className="hero is-info is-large">

        <div className="hero-head">
          <NavBar />
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">WooLNinesun</h1>
            <h2 className="subtitle">咀嚼知識的羊</h2>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
