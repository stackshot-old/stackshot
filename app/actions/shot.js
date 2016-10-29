import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'


export const GET_SHOTS_REQUEST = 'GET_SHOTS_REQUEST'
export const GET_SHOTS_SUCCESS = 'GET_SHOTS_SUCCESS'
export const GET_SHOTS_FAILURE = 'GET_SHOTS_FAILURE'

export const getShots = (data) => (dispatch, getState) => {
  const {query, next} = data || {}
  let {
    isFetching,
    before = '',
    nextPageUrl = `/shots?${query}`
  } = getState().pagination.allshots[query] || {}
  if(next) {
    nextPageUrl = `/shots?${query}&before=${before}`
  }
  if(!isFetching){
    return dispatch({
      query,
      [CALL_API]: {
        types: [ GET_SHOTS_REQUEST, GET_SHOTS_SUCCESS, GET_SHOTS_FAILURE ],
        endpoint: nextPageUrl,
        schema: Schemas.SHOT_ARRAY,
        request: {
          method: 'GET',
          headers: getHeader()
        }
      }
    })
  }
}

export const ADD_SHOT_REQUEST = 'ADD_SHOT_REQUEST'
export const ADD_SHOT_SUCCESS = 'ADD_SHOT_SUCCESS'
export const ADD_SHOT_FAILURE = 'ADD_SHOT_FAILURE'

export const addShot = (data) => (dispatch, getState) => {
  const {token} = getState().auth.user

  return dispatch({
    [CALL_API]: {
      types: [ ADD_SHOT_REQUEST, ADD_SHOT_SUCCESS, ADD_SHOT_FAILURE ],
      endpoint: '/shot',
      schema: Schemas.SHOT,
      request: {
        method: 'POST',
        headers: {...getHeader(), ...{Authorization: `Bearer ${token}`}},
        body: JSON.stringify(data)
      }
    }
  })
}

export const ADD_IMAGE = 'ADD_IMAGE'
export const addImage = (data) => {
  return {
    type: ADD_IMAGE,
    data
  }
}

export const RESET_UPLOAD = 'RESET_UPLOAD'
export const resetUpload = () => {
  return {
    type: RESET_UPLOAD
  }
}
