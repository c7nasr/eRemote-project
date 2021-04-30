import {GET_AUTH_STATUS, UPDATE_AUTH_STATE} from '../config';

export const getAuthState = () => {
  return dispatch => {
    dispatch({type: GET_AUTH_STATUS});
  };
};
export const setAuthState = (is_auth, is_token, token = '') => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_STATE,
      payload: {
        is_auth,
        is_token,
        token,
      },
    });
  };
};
