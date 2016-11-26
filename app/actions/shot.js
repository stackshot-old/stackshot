import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'


export const GET_SHOTS_REQUEST = 'GET_SHOTS_REQUEST'
export const GET_SHOTS_SUCCESS = 'GET_SHOTS_SUCCESS'
export const GET_SHOTS_FAILURE = 'GET_SHOTS_FAILURE'

export const getShots = (data) => (dispatch, getState) => {
  const {query, next, baseUrl} = data || {}
  let {
    isFetching,
    before = '',
    nextPageUrl = baseUrl ? `/${baseUrl}?${query}` : `/shots?${query}`
  } = getState().pagination.allshots[query] || {}

  if(next) {
    nextPageUrl = baseUrl ? `/${baseUrl}?${query}&before=${before}` : `/shots?${query}&before=${before}`
  }

  if(!isFetching){
    return dispatch({
      query: baseUrl ? `${baseUrl}?${query}` : query,
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
  console.log(data)
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

export const LIKE_REQUEST = 'LIKE_REQUEST'
export const LIKE_SUCCESS = 'LIKE_SUCCESS'
export const LIKE_FAILURE = 'LIKE_FAILURE'

export const like = ({id, liked}) => (dispatch, getState) => {
  const {token} = getState().auth.user
  return dispatch({
    [CALL_API]: {
      types: [ LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE ],
      endpoint: `/shot/${id}/like`,
      schema: {shot: Schemas.SHOT},
      request: {
        method: 'PUT',
        headers: {...getHeader(), ...{Authorization: `Bearer ${token}`}},
        body: JSON.stringify({
          liked: !liked
        })
      }
    }
  })
}
