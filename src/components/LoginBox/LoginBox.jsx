import React, { Component } from 'react';
import './LoginBox.css';

const InitialState = {
    name: '',
    password: '',
    remember: false
  }

class LoginBox extends Component {

  state = {
    name: '',
    password: '',
    remember: false
  }

  handleChange(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleCheck() {
    this.setState({
      remember: !this.state.remember
    })
  }

  render () {
    const { 
      handleChange,
      handleCheck,
      state : { name, password, remember } 
    } = this
    return (

      <div className="signin cf">
        <div className="avatar"/>
        <form>
          <div className="inputrow">
            <input type="text" id="name" onChange={handleChange.bind(this, 'name')} placeholder="Username" value={name}/> 
            <label className="ion-person" htmlFor="name"></label>
          </div>
          <div className="inputrow">
            <input type="password" id="pass" onChange={handleChange.bind(this, 'password')} placeholder="Password" value={password}/>
            <label className="ion-locked" htmlFor="pass"></label>
          </div>
          <input type="checkbox" name="remember" id="remember" onChange={handleCheck.bind(this)} checked={remember}/>
          <label className="radio" htmlFor="remember">Stay Logged In</label>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default LoginBox;

