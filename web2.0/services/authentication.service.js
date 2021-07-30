import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = "http://localhost:5000/api/users/";

const register = (email, password) => {
  return axios.post(API_URL + "register", {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
      }

      return response.data;
    });
};
const getUserData = async (token) => {
  return await (
    await axios.get(API_URL + "me", { headers: { "x-access-token": token } })
  ).data;
};

const refresh_token = async (refresh) => {
  return await (
    await axios.post(
      API_URL + "refresh",
      { requestToken: refresh },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
  ).data;
};
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  refresh_token,
  getUserData,
};
