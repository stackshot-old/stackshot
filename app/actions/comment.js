import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'

const checkDefine = (data) => {
  let obj = {}
  Object.keys(data).filter(key => data[key] !== undefined && data[key] !== '').map(key => { obj[key] = data[key]})
  return obj
}

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addComment = () => (dispatch, getState) => {
  const {token} = getState().auth.user
  const {content, parent, replyTo} = getState().comment
  const filter = checkDefine({content, parent, replyTo})

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
