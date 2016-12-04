import {API_ROOT} from '../middleware/api'

export const CONNECT_SUCCESS = 'CONNECT_SUCCESS'
export const CONNECT_FAILED = 'CONNECT_FAILED'
export const DISCONNECT = 'DISCONNECT'
export const START_CONNECT = 'START_CONNECT'
export const ON_NEW_SHOT = 'ON_NEW_SHOT'

export const CLIENT_LOGIN = 'CLIENT_LOGIN'

export const connectSuccess = () => {
	return{
	   type: CONNECT_SUCCESS
	}
}

export const connectFailed = (err) => {
  return{
    type: CONNECT_FAILED,
    err: err
  }
}

export const disConnect = (err) => {
  return{
    type: DISCONNECT,
    err: err
  }
}

export const startConnect = () => {
  return{
    type: START_CONNECT
  }
}

export const onNewShot = (shot) => {
	return {
		type: ON_NEW_SHOT,
		shot
	}
}
