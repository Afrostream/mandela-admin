import { createReducer } from 'redux-create-reducer';
import ActionTypes from '../consts/ActionTypes';

const InitialState = {
  loginPending: false,
  user: null
}

export default createReducer(InitialState, {
  [ActionTypes.User.setUser](state, {user} ) {
    return { ...state, user: user || null }
  }
})