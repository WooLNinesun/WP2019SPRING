import React, { Component } from 'react';
import './sass/bulma.sass';
import './App.sass';
import Header from './components/Header';
import Posts from './components/Posts';

class App extends Component {
  render() {
    return (
      <div className="blog-container">
          <Header />
          <Posts />
        <footer></footer>
      </div>
    );
  }
}

export default App;
