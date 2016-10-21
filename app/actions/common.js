export const HANDLE_ACTION_CHANGE = 'HANDLE_ACTION_CHANGE'

export function handleActionChange(parent, data){
  return {
    type: HANDLE_ACTION_CHANGE,
    parent,
    data
  }
}
