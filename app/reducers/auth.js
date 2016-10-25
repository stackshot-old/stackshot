import * as ActionTypes from '../actions'

export default function auth( state={ user: {} }, action ) {
  switch (action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
    const {result:{token, user}, entities:{users} } = action.response
    const me = users[user]
      return Object.assign({}, state, {user:{...me, token}})
    default:
      return state
  }
}
