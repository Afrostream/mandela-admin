import React, { Component } from 'react';
import logo from './logo.png';
import LoginBox from './components/LoginBox'
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <div className="app-background"/>
        <div className="container">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <LoginBox />
        </div>
      </div>
    );
  }
}

export default App;
