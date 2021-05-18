import {GET_SOCKET, UPDATE_SOCKET} from '../config.js';

const initialState = {
  socket: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case GET_SOCKET:
      return {
        ...state,
      };
    default:
      return state;
  }
};
