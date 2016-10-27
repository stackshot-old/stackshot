import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'

export const UP_LOAD_SHOT = 'UP_LOAD_SHOT'
export const upLoadShot = (data) => {
  return {
    type: UP_LOAD_SHOT,
    data
  }
}
