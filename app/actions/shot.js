import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'

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
