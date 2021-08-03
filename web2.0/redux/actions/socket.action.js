import { connect_socket } from "../../services/socket.service";
import {
  PC_CONNECTION_STATE,
  SOCKET_CONNECT,
  SOCKET_CONNECT_FAIL,
} from "../types";
import { toast } from "react-toastify";

export const connect_action = (key) => async (dispatch) => {
  try {
    const connect = connect_socket(key);
    if (connect) {
      dispatch({
        type: SOCKET_CONNECT,
        payload: {
          is_connected: true,
          is_pc_connected: false,
          socket: connect,
        },
      });
      toast.success("Connected to server. Waiting PC connection");
    }
  } catch (error) {
    console.log(error);
    toast.error("Can't reach our server!");
  }
};

export const updatePcConnectionState = (state) => async (dispatch) => {
  if (state) {
    toast.success("PC is connected");
  } else {
    toast.error("PC is Disconnected ... ", { autoClose: true });
  }
  dispatch({
    type: PC_CONNECTION_STATE,
    payload: {
      is_pc_connected: state,
    },
  });
};
