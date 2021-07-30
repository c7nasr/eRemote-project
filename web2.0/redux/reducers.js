import { combineReducers } from "redux";
import auth from "./reducers/authentaction.reducer";

const reducers = {
  // counter: counterReducer,
  // timer: timerReducer,
  auth: auth,
};

export default combineReducers(reducers);
