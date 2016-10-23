import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

import paginate from './paginate'
import entities from './entities'
import comment from './comment'
import theme from './theme'
import shot from './shot'


const pagination = combineReducers({
  allimages: paginate({
    mapActionToKey: action => action.query,
    types: [
      ActionTypes.POST_LIST_REQUEST,
      ActionTypes.POST_LIST_SUCCESS,
      ActionTypes.POST_LIST_FAILURE,
    ]
  })
})

export default combineReducers({
  pagination,
  entities,
  comment,
  theme,
  shot
})
