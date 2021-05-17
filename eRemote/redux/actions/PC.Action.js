import {getPCInfo, syncPhoneInfo} from '../../lib/api';
import {setTempKey} from '../../lib/auth.handler';
import {
  GET_PC_INFO,
  UPDATE_LOADING_STATE,
  UPDATE_PC_CONNECTION,
} from '../config';

export const updatePCInfo = () => async dispatch => {
  try {
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
    setTempKey(data.key);
    return data;
  } catch (error) {
    return false;
  }
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
