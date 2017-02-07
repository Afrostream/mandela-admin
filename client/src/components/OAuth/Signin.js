import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as OAuthActionCreator from '../../actions/oauth'
import * as UserActionCreators from '../../actions/user'

import './Signin.less'

@connect(({User}) => ({User}))
class Signin extends Component {

  state = {
    form: {
      email: '',
      password: ''
    },
    remember: false
  }

  handleChange (e) {
    const {email, password} = this.refs
    this.setState({
      form: {
        email: email.value,
        password: password.value,
      }
    })
  }

  handleCheck () {
    this.setState({
      remember: !this.state.remember
    })
  }

  handleSubmit (e) {
    const {props:{dispatch}} = this
    e.preventDefault()
    dispatch(OAuthActionCreator.signin(this.state.form)).then(() => {
      dispatch(UserActionCreators.getProfile())
    })
  }

  render () {

    const {
      state : {remember}
    } = this

    return (
      <div className="signin cf">
        <div className="avatar"/>
        <form onSubmit={::this.handleSubmit} onChange={::this.handleChange}>
          <div className="inputrow">
            <input ref="email" type="text" id="email" placeholder="Username"/>
            <label className="ion-person" htmlFor="name"></label>
          </div>
          <div className="inputrow">
            <input ref="password" type="password" id="pass" placeholder="Password"/>
            <label className="ion-locked" htmlFor="pass"></label>
          </div>
          <input ref="remember" type="checkbox"
                 name="remember"
                 onChange={::this.handleCheck} id="remember"
                 checked={remember}/>
          <label className="radio" htmlFor="remember">Stay Logged In</label>
          <input type="submit" role="button"/>
        </form>
      </div>
    )
  }
}

export default Signin
