export const HANDLE_ACTION_CHANGE = 'HANDLE_ACTION_CHANGE'

export const handleActionChange = (parent, data) => {
  return {
    type: HANDLE_ACTION_CHANGE,
    parent,
    data
  }
}

export const getHeader = (noAuth) => {
  let headerInfo = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return headerInfo
}

export const TOGGLE_TOOLBAR = 'TOGGLE_TOOLBAR'
export const toggleToolbar = (data) => {
  return {
    type: TOGGLE_TOOLBAR,
    data
  }
}
