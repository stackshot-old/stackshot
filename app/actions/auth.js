import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'
import {checkDefine} from '../utils'

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'

export const signin = (data) => {
  return {
    [CALL_API]: {
      types: [ SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE ],
      endpoint: '/auth/signin',
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
      types: [ SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE ],
      endpoint: '/auth/signup',
      schema: {user: Schemas.USER},
      request: {
        method: 'POST',
        headers: getHeader(true),
        body: JSON.stringify(data)
      }
    }
  }
}

export const UPDATE_PROFILES_REQUEST = 'UPDATE_PROFILES_REQUEST'
export const UPDATE_PROFILES_SUCCESS = 'UPDATE_PROFILES_SUCCESS'
export const UPDATE_PROFILES_FAILURE = 'UPDATE_PROFILES_FAILURE'

export const updateProfiles = (data) => (dispatch, getState) => {
  const {token} = getState().auth.user
  const filter = checkDefine(data)
  return dispatch({
    [CALL_API]: {
      types: [ UPDATE_PROFILES_REQUEST, UPDATE_PROFILES_SUCCESS, UPDATE_PROFILES_FAILURE ],
      endpoint: `/user/profiles`,
      schema: {user: Schemas.USER},
      request: {
        method: 'PUT',
        headers: {...getHeader(), ...{Authorization: `Bearer ${token}`}},
        body: JSON.stringify(filter)
      }
    }
  })
}

export const LOG_OUT = 'LOG_OUT'
export const logout = () => {
  return {
    type: LOG_OUT
  }
}
