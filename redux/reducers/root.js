import { combineReducers } from "redux";
import app from "./app"
import auth from './auth'
import control from './control'
import download from './download'
export default combineReducers({
app,
auth,
control,
download
})