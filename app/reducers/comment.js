import * as ActionTypes from '../actions'

export default function shot( state={ isComment: false }, action ) {
  switch (action.type) {
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'comment'){
        return Object.assign({}, state, action.data)
      }
    default:
      return state
  }
}
