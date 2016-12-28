import ActionTypes from '../consts/ActionTypes'
import { browserHistory } from 'react-router'
import User from '../lib/api/User'

export function getUser() {
  return User.get()
}

export function setUser(user) {
  console.log('SetUser :', user)
  return {
    type: ActionTypes.User.setUser,
    user
  }
}

export function logUser({ name, password }) {
  return (dispatch, getState) => {
    User.signIn({
      email: name,
      password
    }).then(getUser)
      .then((user) => dispatch(setUser(user)))
      .then(() =>  browserHistory.push('/'))
      .catch(err => console.warn('Log error :', err))
  }
}