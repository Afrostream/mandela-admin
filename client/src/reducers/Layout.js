import Immutable from 'immutable'
import ActionTypes from '../consts/ActionTypes'
import createReducer from '../core/createReducer'

const initialState = Immutable.fromJS({
  state: {
    sideBarOpen: false,
    searchBarOpen: false,
    tabs: []
  }
})

export default createReducer(initialState, {

  [ActionTypes.Layout.state](state, {data}) {
    return state.merge({
      ['state']: data
    })
  }
})