import ActionTypes from '../consts/ActionTypes'

export function signin (form) {
  return async api => ({
    type: ActionTypes.OAuth.signin,
    res: await api({path: `/auth/signin`, method: 'POST', params: form})
  })
}


/**
 * Logout user
 * @returns {Function}
 */
export function signOut () {
  return {
    type: ActionTypes.OAuth.signOut
  }
}
