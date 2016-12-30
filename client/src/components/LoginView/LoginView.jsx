import React, { Component } from 'react';
import logo from '../../../public/assets/logo.png';
import LoginBox from '../LoginBox/LoginBox'
import './LoginView.less';

class LoginView extends Component {
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

export default LoginView;
