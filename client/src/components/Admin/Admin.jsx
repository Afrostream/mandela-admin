import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { setUser } from '../../actions/user'
import LoginView from '../LoginView/LoginView'
import './Admin.css'

class Admin extends Component {

  componentWillMount() {
    this.confirmUser(this.props)
  }

  componentWillUpdate(nextProps) {
    this.confirmUser(nextProps)
  }

  disconnectUser() {
    this.props.setUser(null)
  }

  confirmUser(props) {
    if (!props.User.user) {
      browserHistory.push('/login')
    }
  }

  render() {
    if (!this.props.User.user) {
      return <LoginView />
    }
    return (
      <div className="mandela-admin">
        <h1>Admin</h1>
        <button onClick={this.disconnectUser.bind(this)}>Disconnect</button>
      </div>
    )
  }
}

export default connect(({User}) => ({User}), {
  setUser,
})(Admin)