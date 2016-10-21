import * as ActionTypes from '../actions'

export default function theme( state={ activeTheme: '#f25d8e', storeTheme: '' }, action ) {
  switch (action.type) {
    case ActionTypes.HANDLE_INPUT_CHANGE:
      if(action.parent === 'theme'){
        return Object.assign({}, state, action.data)
      }
    default:
      return state
  }
}
