import { CALL_API, Schemas } from '../middleware/api'
import { getHeader } from '../actions'

export const GET_SHOTS_REQUEST = 'GET_SHOTS_REQUEST'
export const GET_SHOTS_SUCCESS = 'GET_SHOTS_SUCCESS'
export const GET_SHOTS_FAILURE = 'GET_SHOTS_FAILURE'

export const getShots = (query) => (dispatch, getState) => {

  const {
    pageCount = 0
  } = getState().pagination.allshots[query] || {}

  if (pageCount > 0) {
    return null
  }

  return dispatch({
    query,
    [CALL_API]: {
      types: [ GET_SHOTS_REQUEST, GET_SHOTS_SUCCESS, GET_SHOTS_FAILURE ],
      endpoint: '/shots',
      schema: Schemas.SHOT_ARRAY,
      request: {
        method: 'GET',
        headers: getHeader()
      }
    }
  })
}


const loadImageList = (apiRoot, action) => {
  return (query) => {
    return (dispatch, getState) => {
      const {
        nextPageUrl = `${apiRoot}/${query}`,
        pageCount = 0
      } = getState().pagination.allimages[query] || {}

      if (pageCount > 0) {
        return null
      }

      return dispatch(action(query, nextPageUrl))
    }
  }
}


export const POST_LIST_REQUEST = 'POST_LIST_REQUEST'
export const POST_LIST_SUCCESS = 'POST_LIST_SUCCESS'
export const POST_LIST_FAILURE = 'POST_LIST_FAILURE'

const fetchGithubList = (query, nextPageUrl) => {
  return {
    query,
    [CALL_API]: {
      types: [ POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_LIST_FAILURE ],
      endpoint: nextPageUrl,
      schema: Schemas.SHOT,
      request: {
        method: 'GET',
        headers: getHeader()
      }
    }
  }
}



export const loadGithubList = loadImageList('https://gist.githubusercontent.com', fetchGithubList)
