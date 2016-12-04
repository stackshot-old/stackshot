import * as ActionTypes from '../actions'

export default function theme( state={ baseColor: '255,255,255', themeColor: '250,114,131'}, action ) {
  switch (action.type) {
    case ActionTypes.HANDLE_THEME_CHANGE:
      return {...state, ...action.data}
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'theme'){
        return {...state, ...action.data}
      }
    default:
      return state
  }
}
