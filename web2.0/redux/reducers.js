import { combineReducers } from "redux";
import auth from "./reducers/authentaction.reducer";
import socket from "./reducers/socket.reducer";
import screenshot from "./reducers/screenshot.reducer";

const reducers = {
  // counter: counterReducer,
  // timer: timerReducer,
  auth: auth,
  socket: socket,
  screenshot,
};

export default combineReducers(reducers);
