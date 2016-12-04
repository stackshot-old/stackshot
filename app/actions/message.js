import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST'
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS'
export const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE'

export const getMessages = (data) => (dispatch, getState) => {
  const {token} = getState().auth.user
  const {query, next} = data || {}
  let {
    isFetching,
    before = '',
    nextPageUrl = `/auth/messages?${query}`
  } = getState().pagination.allcomments[query] || {}
  if(next) {
    nextPageUrl = `/auth/comments?${query}&before=${before}`
  }
  if(!isFetching){
    return dispatch({
      query,
      [CALL_API]: {
        types: [ GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE ],
        endpoint: nextPageUrl,
        schema: Schemas.MESSAGE_ARRAY,
        request: {
          method: 'GET',
          headers: {...getHeader(), ...{Authorization: `Bearer ${token}`}},
        }
      }
    })
  }
}
