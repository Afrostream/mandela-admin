import ActionTypes from '../consts/ActionTypes'
import User from '../lib/api/User'

export function getUser() {
  return User.get()
}

export function setUser(user) {
  return {
    type: ActionTypes.User.setUser,
    user
  }
}

export function checkUser() {
  console.warn('Checking if user')
  return dispatch => {
    return User.hasToken() && 
    User.get()
        .then((user) => dispatch(setUser(user)))
        .catch(err => ({error: err}))
  }
  
}

export function signOut() {
  return (dispatch) => {
    User.signOut()
    dispatch(setUser(null))
  }
}

export function logUser({ name, password }) {
  return (dispatch, getState) => {
    User.signIn({
      email: name,
      password
    }).then(getUser)
      .then((user) => dispatch(setUser(user)))
      .catch(err => console.warn('Log error :', err))
  }
}