import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

import paginate from './paginate'
import entities from './entities'
import comment from './comment'
import common from './common'
import socket from './socket'
import search from './search'
import theme from './theme'
import shot from './shot'
import auth from './auth'

const pagination = combineReducers({
  allshots: paginate({
    mapActionToKey: action => action.query,
    types: [
      ActionTypes.GET_SHOTS_REQUEST,
      ActionTypes.GET_SHOTS_SUCCESS,
      ActionTypes.GET_SHOTS_FAILURE,
    ]
  }),
  allsearchs: paginate({
    mapActionToKey: action => action.query,
    types: [
      ActionTypes.GET_SEARCHS_REQUEST,
      ActionTypes.GET_SEARCHS_SUCCESS,
      ActionTypes.GET_SEARCHS_FAILURE,
    ]
  }),
  allcomments: paginate({
    mapActionToKey: action => action.query,
    types: [
      ActionTypes.GET_COMMENTS_REQUEST,
      ActionTypes.GET_COMMENTS_SUCCESS,
      ActionTypes.GET_COMMENTS_FAILURE
    ]
  }),
  allmessages: paginate({
    mapActionToKey: action => action.query,
    types: [
      ActionTypes.GET_MESSAGES_REQUEST,
      ActionTypes.GET_MESSAGES_SUCCESS,
      ActionTypes.GET_MESSAGES_FAILURE
    ]
  })
})

export default combineReducers({
  pagination,
  entities,
  comment,
  common,
  search,
  socket,
  theme,
  shot,
  auth
})
