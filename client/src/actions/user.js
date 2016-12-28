import ActionTypes from '../consts/ActionTypes'
import { browserHistory } from 'react-router'

export function setUser(user) {
  console.log('SetUser :', user)
  return {
    type: ActionTypes.User.setUser,
    user
  }
}

export function logUser({ name, password }) {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(setUser({ name, password }))
      browserHistory.push('/')
    }, 1000)
  }
}