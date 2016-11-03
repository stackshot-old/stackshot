import * as ActionTypes from '../actions'

const init = { isComment: false,  content: '', parent: '', replyTo: '', placeholder: '评论来一发~(*･∀･)／＼(･∀･*)'  }
export default function shot( state=init, action ) {
  switch (action.type) {
    case ActionTypes.RESET_COMMENT:
      return init
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'comment'){
        return Object.assign({}, state, action.data)
      }
    default:
      return state
  }
}
