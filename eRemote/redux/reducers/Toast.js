import {CREATE_TOAST, HIDE_TOAST} from '../config.js';

const initialState = {
  loadingStatus: false,
  message: '',
  dismissAfter: 5000,
  color: '',
  pos: 'bottom',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TOAST:
      return {
        ...state,
        message: action.payload.message,
        dismissAfter: action.payload.dismissAfter,
        color: action.payload.color,
        pos: action.payload.pos,
      };
    case HIDE_TOAST:
      return {
        ...state,
        message: '',
        dismissAfter: 5000,
        color: '',
      };
    default:
      return state;
  }
};
