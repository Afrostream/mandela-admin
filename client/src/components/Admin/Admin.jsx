import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { signOut } from '../../actions/user'
import LoginView from '../LoginView/LoginView'
import './Admin.css'

class Admin extends Component {

  // disconnectUser() {
  //   this.props.setUser(null)
  // }

  render() {
    if (!this.props.User.user) {
      return <LoginView />
    }
    return (
      <div className="mandela-admin">
        <h1>Admin</h1>
        <button onClick={this.props.signOut}>Disconnect</button>
      </div>
    )
  }
}

export default connect(({User}) => ({User}), {
  signOut,
})(Admin)