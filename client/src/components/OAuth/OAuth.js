import React, { Component } from 'react';
import logo from '../../../public/assets/logo.png';
import Signin from './Signin'
import './OAuth.less';

class Oauth extends Component {
  render () {
    return (
      <div className="oauth">
        <div className="oauth-background"/>
        <div className="oauth-container">
          <Signin />
        </div>
      </div>
    );
  }
}

export default Oauth;