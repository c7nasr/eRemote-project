import {POWER_HISTORY} from '../config';

export const getPowerHistory = data => {
  return dispatch => {
    dispatch({
      type: POWER_HISTORY,
      payload: {
        history: data,
      },
    });
  };
};
