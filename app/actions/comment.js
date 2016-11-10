import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'
import {checkDefine} from '../utils'


export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addComment = () => (dispatch, getState) => {
  const {token} = getState().auth.user
  const {content, shot, replyTo} = getState().comment
  const filter = checkDefine({content, shot, replyTo})

  return dispatch({
    [CALL_API]: {
      types: [ ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE ],
      endpoint: '/comment',
      schema: {shot: Schemas.SHOT, comment: Schemas.COMMENT},
      request: {
        method: 'POST',
        headers: {...getHeader(), ...{Authorization: `Bearer ${token}`}},
        body: JSON.stringify(filter)
      }
    }
  })
}

export const RESET_COMMENT = 'RESET_COMMENT'

export const resetComment = () => {
  return {
    type: RESET_COMMENT
  }
}

export const TOGGLE_COMMENT = 'TOGGLE_COMMENT'

export const toggleComment = () => {
  return {
    type: TOGGLE_COMMENT
  }
}
