import pull from 'lodash/pull'

export const obj2query = (obj) => {
  return pull(Object.keys(obj).sort().map(key => obj[key] && key + '=' + obj[key]), undefined).join('&')
}


export const fromPairs = (pairs)  => {
  var index = -1,
      length = pairs ? pairs.length : 0,
      result = {}

  while (++index < length) {
    var pair = pairs[index]
    result[pair[0]] = pair[1]
  }
  return result
}

export const genRgb = () => [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)].join(',')
