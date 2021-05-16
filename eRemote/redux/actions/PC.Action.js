import {getPCInfo, syncPhoneInfo} from '../../lib/api';
import {
  GET_PC_INFO,
  UPDATE_LOADING_STATE,
  UPDATE_PC_CONNECTION,
} from '../config';

export const updatePCInfo = () => async dispatch => {
  dispatch({type: UPDATE_LOADING_STATE, payload: {is_loading: true}});
  const {data} = await getPCInfo();
  // TODO: Handle if no location.
  await syncPhoneInfo();
  dispatch({
    type: GET_PC_INFO,
    payload: {
      pc: data,
      last_update: data.updatedAt,
    },
  });
};
export const updatePcConnectionState = is_connected => {
  return dispatch => {
    dispatch({
      type: UPDATE_PC_CONNECTION,
      payload: {
        is_connected: is_connected,
      },
    });
  };
};
