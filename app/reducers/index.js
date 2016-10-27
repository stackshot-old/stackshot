import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

import paginate from './paginate'
import entities from './entities'
import comment from './comment'
import common from './common'
import theme from './theme'
import shot from './shot'
import auth from './auth'

const pagination = combineReducers({
  allimages: paginate({
    mapActionToKey: action => action.query,
    types: [
      ActionTypes.POST_LIST_REQUEST,
      ActionTypes.POST_LIST_SUCCESS,
      ActionTypes.POST_LIST_FAILURE,
    ]
  }),
  allshots: paginate({
    mapActionToKey: action => action.query,
    types: [
      ActionTypes.GET_SHOTS_REQUEST,
      ActionTypes.GET_SHOTS_SUCCESS,
      ActionTypes.GET_SHOTS_FAILURE,
    ]
  })
})

export default combineReducers({
  pagination,
  entities,
  comment,
  common,
  theme,
  shot,
  auth
})
