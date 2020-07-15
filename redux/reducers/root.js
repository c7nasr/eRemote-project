import { combineReducers } from "redux";
import app from "./app"
import auth from './auth'
import control from './control'
import order from './order'
export default combineReducers({
app,
auth,
control,
order
})