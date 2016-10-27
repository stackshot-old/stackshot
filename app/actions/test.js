import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'

export const ADD_SHOT_REQUEST = 'ADD_SHOT_REQUEST'
export const ADD_SHOT_SUCCESS = 'ADD_SHOT_SUCCESS'
export const ADD_SHOT_FAILURE = 'ADD_SHOT_FAILURE'

export const addShot = (data) => (dispatch, getState) => {

  return dispatch({
    [CALL_API]: {
      types: [ ADD_SHOT_REQUEST, ADD_SHOT_SUCCESS, ADD_SHOT_FAILURE ],
      endpoint: '/shot',
      schema: Schemas.SHOT,
      request: {
        method: 'POST',
        headers: {...getHeader(), ...{Authorization: token}},
        body: JSON.stringify(data)
      }
    }
  })
}

export const POST_LIST_REQUEST = 'POST_LIST_REQUEST'
export const POST_LIST_SUCCESS = 'POST_LIST_SUCCESS'
export const POST_LIST_FAILURE = 'POST_LIST_FAILURE'

export const fetchShots = (query) => (dispatch, getState) => {

  const {
    nextPageUrl = `${apiRoot}${query}`,
    pageCount = 0
  } = getState().pagination.allshots[query] || {}

  if (pageCount > 0) {
    return null
  }

  return dispatch({
    query,
    [CALL_API]: {
      types: [ POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_LIST_FAILURE ],
      endpoint: '/shots',
      schema: Schemas.SHOT_ARRAY,
      request: {
        method: 'GET',
        headers: getHeader()
      }
    }
  })
}
