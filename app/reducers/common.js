import * as ActionTypes from '../actions'

export default function common( state={ toolbar: {activeIndex: 0} }, action ) {
  switch (action.type) {
    case ActionTypes.TOGGLE_TOOLBAR:
      return {...state, ...{toolbar:{...action.data}}}
    default:
      return state
  }
}
