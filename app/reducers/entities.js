import * as ActionTypes from '../actions'
import merge from 'lodash/merge'

export default function entities( state={ images: {}, shots: {}, comments: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}
