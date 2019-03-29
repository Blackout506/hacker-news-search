import React, { Component } from 'react';
import './App.css';

import Search from './containers/Search/Search';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Hacker News Search</h1>
        <Search />
      </div>
    );
  }
}

export default App;
