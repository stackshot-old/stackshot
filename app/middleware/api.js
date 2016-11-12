import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import Symbol from 'es6-symbol'

export const API_ROOT = `http://192.168.5.8:7999`


// Extracts the next page URL from Github API response.
function getBeforeTime(response, json) {
  if(Array.isArray(json) && json.length > 0){
    const {createdAt} = json.slice(-1)[0]
    if(createdAt){
      return createdAt
    }
  }
}


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, request) {
  const fullUrl = endpoint.includes(API_ROOT) ? endpoint : (API_ROOT + endpoint)
  return fetch(fullUrl, request)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)
      const before = getBeforeTime(response, json)
      return Object.assign({},
        normalize(camelizedJson, schema),
        { before}
      )
    })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const userSchema = new Schema('users', {
  idAttribute: 'id'
})

const uploadSchema = new Schema('upload', {
  idAttribute: 'hash'
})

const shotSchema = new Schema('shots', {
  idAttribute: 'id'
})

const commentSchema = new Schema('comments', {
  idAttribute: 'id'
})

shotSchema.define({
  user: userSchema,
  latestComment: arrayOf(commentSchema)
})

commentSchema.define({
  user: userSchema,
})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  UPLOAD: uploadSchema,
  SHOT: shotSchema,
  SHOT_ARRAY: arrayOf(shotSchema),
  COMMENT: commentSchema,
  COMMENT_ARRAY: arrayOf(commentSchema)
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, request } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  if (!request) {
    request = {}
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema, request).then(
    response => next(actionWith({
      type: successType,
      response
    })),
    error => {
      let message = ''
      if(error.code !== 0 && error.code !== undefined){
        message = error.message
      }
      return next(actionWith({
        type: failureType,
        error: error,
        details: error.details,
        code: error.code
      }))
    }
  )
}
