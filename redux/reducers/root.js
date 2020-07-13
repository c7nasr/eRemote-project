import { combineReducers } from "redux";
import app from "./app"
import auth from './auth'
import control from './control'
export default combineReducers({
app,
auth,
control
})