import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

import paginate from './paginate'
import entities from './entities'
import theme from './theme'


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
  theme
})
