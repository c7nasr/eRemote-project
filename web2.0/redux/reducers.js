import { combineReducers } from "redux";
import auth from "./reducers/authentaction.reducer";
import socket from "./reducers/socket.reducer";

const reducers = {
  // counter: counterReducer,
  // timer: timerReducer,
  auth: auth,
  socket: socket,
};

export default combineReducers(reducers);
