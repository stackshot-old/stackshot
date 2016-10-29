import * as ActionTypes from '../actions'

const init = {user: {}}
export default function auth( state=init, action ) {
  switch (action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
    const {result:{token, user}, entities:{users} } = action.response
    const me = users[user]
      return Object.assign({}, state, {user:{...me, token}})
    case ActionTypes.LOG_OUT:
      return init
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'auth'){
        return Object.assign({}, state, action.data)
      }
    default:
      return state
  }
}
