import {UPDATE_SECURITY_REPORTS} from '../config';

export const updateSecurity = security_arr => {
  return dispatch => {
    dispatch({
      type: UPDATE_SECURITY_REPORTS,
      payload: {
        security: security_arr,
      },
    });
  };
};
