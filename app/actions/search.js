import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'


export const GET_SEARCHS_REQUEST = 'GET_SEARCHS_REQUEST'
export const GET_SEARCHS_SUCCESS = 'GET_SEARCHS_SUCCESS'
export const GET_SEARCHS_FAILURE = 'GET_SEARCHS_FAILURE'

export const getSearchs= (data) => (dispatch, getState) => {
  const {query, next} = data || {}
  let {
    isFetching,
    before = '',
    nextPageUrl = `/search?${query}`
  } = getState().pagination.allshots[query] || {}
  if(next) {
    nextPageUrl = `/search?${query}&before=${before}`
  }
  if(!isFetching){
    return dispatch({
      query,
      [CALL_API]: {
        types: [ GET_SEARCHS_REQUEST, GET_SEARCHS_SUCCESS, GET_SEARCHS_FAILURE ],
        endpoint: nextPageUrl,
        schema: Schemas.SHOT_ARRAY,
        request: {
          method: 'GET',
          headers: getHeader()
        }
      }
    })
  }
}

export const RESET_SEARCH = 'RESET_SEARCH'

export const resetSearch = () => {
  return {
    type: RESET_SEARCH
  }
}

export const TOGGLE_SEARCH = 'TOGGLE_SEARCH'

export const toggleSearch = () => {
  return {
    type: TOGGLE_SEARCH
  }
}
