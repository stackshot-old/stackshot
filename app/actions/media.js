import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'

export const uploadImage = (data) => (dispatch, getState) => {
  const {token} = getState().auth
  return dispatch({
    [CALL_API]: {
      types: [ UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE ],
      endpoint: 'http://192.168.31.157:7999/media/upload_image',
      schema: Schemas.UPLOAD,
      request: {
        method: 'PUT',
        headers: {...getHeader(), {Authorization: token}},
        body: JSON.stringify(data)
      }
  })
  }
}
