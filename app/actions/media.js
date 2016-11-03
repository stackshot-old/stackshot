import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'


export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'

export const uploadImage = (image) => (dispatch, getState) => {
  const {path} = image
  const {token} = getState().auth.user
  const files = new FormData()
  files.append('files', image)
  return dispatch({
    [CALL_API]: {
      types: [ UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE ],
      endpoint: '/media/upload_image',
      schema: Schemas.UPLOAD,
      request: {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/from-data',
          'Authorization': `Bearer ${token}`
        },
        body: files
      }
    }
  })
}
