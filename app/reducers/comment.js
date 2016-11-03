import * as ActionTypes from '../actions'

const init = { isComment: false,  content: '', parent: '', replyTo: '', placeholder: '评论来一发~(*･∀･)／＼(･∀･*)'  }
export default function shot( state=init, action ) {
  switch (action.type) {
    case ActionTypes.RESET_COMMENT:
      return init
    case ActionTypes.TOGGLE_COMMENT:
      return {...state, ...{
        isComment: !state.isComment,
        content: '',
        parent: '',
        replyTo: '',
        placeholder: init.placeholder,
      }}
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'comment'){
        return {...state, ...action.data}
      }
    default:
      return state
  }
}
