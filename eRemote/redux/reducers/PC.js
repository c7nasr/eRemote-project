import {
  GET_PC_INFO,
  UPDATE_LOADING_STATE,
  UPDATE_PC_CONNECTION,
} from '../config.js';

const initialState = {
  pc_info: {},
  last_update: '',
  is_connected: false,
  is_loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PC_INFO:
      return {
        ...state,
        pc_info: action.payload.pc,
        last_update: action.payload.last_update,
        is_loading: false,
      };
    case UPDATE_LOADING_STATE:
      return {
        ...state,
        is_loading: action.payload.is_loading,
      };
    case UPDATE_PC_CONNECTION:
      return {
        ...state,
        is_connected: action.payload.is_connected,
      };
    default:
      return state;
  }
};
