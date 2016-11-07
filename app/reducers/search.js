import * as ActionTypes from '../actions'

const init = { isSearch: false,  content: ''}
export default function search( state=init, action ) {
  switch (action.type) {
    case ActionTypes.RESET_SEARCH:
      return init
    case ActionTypes.TOGGLE_SEARCH:
      return {...state, ...{
        isSearch: !state.isSearch,
        content: '',
      }}
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'search'){
        return {...state, ...action.data}
      }
    default:
      return state
  }
}
