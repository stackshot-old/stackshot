import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'

export const signin = (data) => {
  return {
    [CALL_API]: {
      types: [ SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE ],
      endpoint: 'http://192.168.5.7:7999/auth/signin',
      schema: {user: Schemas.USER},
      request: {
        method: 'POST',
        headers: getHeader(true),
        body: JSON.stringify(data)
      }
    }
  }
}


export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const signup = (data) => {
  return {
    [CALL_API]: {
      types: [ SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE ],
      endpoint: 'http://192.168.5.7:7999/auth/signup',
      schema: {user: Schemas.USER},
      request: {
        method: 'POST',
        headers: getHeader(true),
        body: JSON.stringify(data)
      }
    }
  }
}
