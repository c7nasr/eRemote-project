import axios from "axios";
const config_connect = axios.create({
  baseURL:"https://ncontrol.herokuapp.com/api/config"
});
config_connect.defaults.headers["Content-Type"] = "application/json";
export default config_connect;
