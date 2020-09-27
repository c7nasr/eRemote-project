import axios from "axios";
const connect_control = axios.create({
  baseURL:"https://ncontrol.herokuapp.com/api/"
});
connect_control.defaults.headers["Content-Type"] = "application/json";
export default connect_control;
