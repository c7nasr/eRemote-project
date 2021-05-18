import {CREATE_TOAST, HIDE_TOAST} from '../config';

export const showNewError = (
  message,
  color,
  dismissAfter = 5000,
  pos = 'bottom',
) => {
  return dispatch => {
    dispatch({
      type: CREATE_TOAST,
      payload: {
        message,
        dismissAfter,
        color,
        pos,
      },
    });
  };
};

export const hideErrors = () => {
  return dispatch => {
    dispatch({
      type: HIDE_TOAST,
    });
  };
};
