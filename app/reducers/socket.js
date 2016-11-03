import * as ActionTypes from '../actions'

export default function socket(state = { connectStatus: null, newShot:{waiting: true, count: 0, queue: []}  }, action){
  switch(action.type){
    case ActionTypes.START_CONNECT:
        return Object.assign({}, state, {
          connectStatus: "connecting"
        })
    case ActionTypes.CONNECT_SUCCESS:
        return Object.assign({}, state, {
          connectStatus: "success"
        })
    case ActionTypes.CONNECT_FAILED:
        return Object.assign({}, state, {
          connectStatus: action.err
        })
    case ActionTypes.DISCONNECT:
        return Object.assign({}, state, {
          connectStatus: action.err
        })
    case ActionTypes.ON_NEW_SHOT:
      return Object.assign({}, state, {
        waiting: true,
        count: ++state.newShot.count,
        queue: state.newShot.queue.push(action.data)
      })
    default:
        return state
  }
}
