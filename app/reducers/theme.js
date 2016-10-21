import * as ActionTypes from '../actions'

export default function theme( state={ activeTheme: '250,114,131', storeTheme: '' }, action ) {
  switch (action.type) {
    case ActionTypes.HANDLE_INPUT_CHANGE:
      if(action.parent === 'theme'){
        return Object.assign({}, state, action.data)
      }
    default:
      return state
  }
}
