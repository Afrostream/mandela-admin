import React, { Component } from 'react';
import './LoginBox.css';

class LoginBox extends Component {
  render () {
    return (

      <div className="signin cf">
        <div className="avatar"/>
        <form>
          <div className="inputrow">
            <input type="text" id="name" placeholder="Username"/>
            <label className="ion-person" htmlFor="name"></label>
          </div>
          <div className="inputrow">
            <input type="password" id="pass" placeholder="Password"/>
            <label className="ion-locked" htmlFor="pass"></label>
          </div>
          <input type="checkbox" name="remember" id="remember"/>
          <label className="radio" htmlFor="remember">Stay Logged In</label>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

export default LoginBox;

