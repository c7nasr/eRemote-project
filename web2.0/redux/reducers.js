import { combineReducers } from "redux";
import auth from "./reducers/authentaction.reducer";
import socket from "./reducers/socket.reducer";
import screenshot from "./reducers/screenshot.reducer";
import security from "./reducers/security.reducer";

const reducers = {
  // counter: counterReducer,
  // timer: timerReducer,
  auth: auth,
  socket: socket,
  screenshot,
  security,
};

export default combineReducers(reducers);
