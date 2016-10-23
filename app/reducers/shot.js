import * as ActionTypes from '../actions'

export default function shot( state={ isShot: false }, action ) {
  switch (action.type) {
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'shot'){
        return Object.assign({}, state, action.data)
      }
    default:
      return state
  }
}
