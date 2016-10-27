import * as ActionTypes from '../actions'

export default function shot( state={ isShot: false, upload: { isUpload: false, src:''},   }, action ) {
  switch (action.type) {
    case ActionTypes.UP_LOAD_SHOT:
      return {...state, ...{upload:{...action.data}}}
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'shot'){
        return Object.assign({}, state, action.data)
      }
    default:
      return state
  }
}
