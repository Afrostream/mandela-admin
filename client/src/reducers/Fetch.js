import Immutable from 'immutable'
import ActionTypes from '../consts/ActionTypes'
import createReducer from '../core/createReducer'

const initialState = Immutable.fromJS({
  isFetching: null
})

export default createReducer(initialState, {

  [ActionTypes.Fetch.setFetch](state, {isFetching}) {
    return state.merge({
      isFetching
    })
  }
})
