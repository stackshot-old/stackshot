import {API_ROOT} from '../middleware/api'
import io from "socket.io-client/socket.io"

window.navigator.userAgent = 'react-native'

const socket = io(`${API_ROOT}`,{transports: ['websocket'], jsonp: false})


export const CONNECT_SUCCESS = 'CONNECT_SUCCESS'
export const CONNECT_FAILED = 'CONNECT_FAILED'
export const DISCONNECT = 'DISCONNECT'
export const START_CONNECT = 'START_CONNECT'
export const ON_NEW_SHOT = 'ON_NEW_SHOT'

const connectSuccess = () => {
	return{
	   type: CONNECT_SUCCESS
	}
}

const connectFailed = (err) => {
  return{
    type: CONNECT_FAILED,
    err: err
  }
}

const disConnect = (err) => {
  return{
    type: DISCONNECT,
    err: err
  }
}

const startConnect = () => {
  return{
      type: START_CONNECT
  }
}

const onNewShot = (shot) => {
	return {
		type: ON_NEW_SHOT,
		shot
	}
}

export const connectWebScoket = () => (dispatch, getState) => {
	socket.connect()
  dispatch(startConnect())
	socket.on('new-shot', (data) => {
		dispatch(onNewShot(data))
	})
  socket.on('connect', () => {
    dispatch(connectSuccess())
  })
  socket.on('error',(err) => {
    dispatch(connectFailed(err))
  })
  socket.on('connect_error',(err) => {
    dispatch(connectFailed(err))
  })
  socket.on('disconnect',() => {
    dispatch(disConnect())
  })
}
