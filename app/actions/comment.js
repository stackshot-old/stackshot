import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'
import {checkDefine} from '../utils'

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST'
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE'

export const getComments= (data) => (dispatch, getState) => {
  const {query, next} = data || {}
  let {
    isFetching,
    before = '',
    nextPageUrl = `/comments?${query}`
  } = getState().pagination.allcomments[query] || {}
  if(next) {
    nextPageUrl = `/comments?${query}&before=${before}`
  }
  if(!isFetching){
    return dispatch({
      query,
      [CALL_API]: {
        types: [ GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE ],
        endpoint: nextPageUrl,
        schema: Schemas.COMMENT_ARRAY,
        request: {
          method: 'GET',
          headers: getHeader()
        }
      }
    })
  }
}


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
