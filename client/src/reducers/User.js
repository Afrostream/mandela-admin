import { createReducer } from 'redux-create-reducer';
import ActionTypes from '../consts/ActionTypes';

const InitialState = {
  loginPending: false,
  user: {}
}

export default createReducer(InitialState, {
  [ActionTypes.User.setUser](state, {user} ) {
    console.log('Set user :', user )
    return { ...state, user: user || null }
  }
})