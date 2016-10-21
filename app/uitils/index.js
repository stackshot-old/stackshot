import pull from 'lodash/pull'

/*
 * obj2query
 */
export function obj2query(obj){
  return pull(Object.keys(obj).sort().map(key => obj[key] && key + '=' + obj[key]), undefined).join('&')
}
