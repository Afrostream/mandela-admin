import ActionTypes from '../consts/ActionTypes'

export function fetch (isFetching) {
  return async api => ({
    type: ActionTypes.Fetch.setFetch,
    isFetching
  })
}
