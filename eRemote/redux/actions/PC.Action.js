import {getPCInfo, syncPhoneInfo} from '../../lib/api';
import {GET_PC_INFO, UPDATE_LOADING_STATE} from '../config';

export const updatePCInfo = () => async dispatch => {
  dispatch({type: UPDATE_LOADING_STATE, payload: {is_loading: true}});
  const {data} = await getPCInfo();
  // TODO: Handle if no location.
  await syncPhoneInfo();
  dispatch({
    type: GET_PC_INFO,
    payload: {
      pc: data,
      is_connected: true,
      // GET COnnection state from sockets
      last_update: data.updatedAt,
    },
  });
};
