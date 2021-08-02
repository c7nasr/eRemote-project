import {
  PC_CONNECTION_STATE,
  SOCKET_CONNECT,
  SOCKET_CONNECT_FAIL,
} from "../types";

const initialState = {
  is_connected: false,
  is_pc_connected: false,
  socket: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SOCKET_CONNECT:
      return {
        ...state,
        is_connected: payload.is_connected,
        is_pc_connected: payload.is_pc_connected,
        socket: payload.socket,
      };
    case SOCKET_CONNECT_FAIL:
      return {
        ...state,
        is_connected: false,
        is_pc_connected: false,
        socket: {},
      };
    case PC_CONNECTION_STATE:
      return {
        ...state,
        is_pc_connected: payload.is_pc_connected,
      };
    default:
      return state;
  }
}
