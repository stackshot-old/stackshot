import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

import entities from './entities'
import theme from './theme'

export default combineReducers({
  entities,
  theme
})
