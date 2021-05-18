import {GET_SOCKET, UPDATE_SOCKET} from '../config';

export const addSocketToStore = socket => {
  return dispatch => {
    dispatch({
      type: UPDATE_SOCKET,
      payload: socket,
    });
  };
};

export const getSocket = () => {
  return dispatch => {
    dispatch({
      type: GET_SOCKET,
    });
  };
};
