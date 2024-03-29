import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signOut, checkUser } from '../../actions/user'
import LoginView from '../LoginView/LoginView'
import './Admin.less'

class Admin extends Component {
  componentWillMount() {
    this.props.checkUser()
  }

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
  signOut, checkUser
})(Admin)
