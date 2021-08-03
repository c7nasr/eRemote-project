import axios from "axios";
import Cookies from "universal-cookie";
import { parseCookies } from "./cookies.service";

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
const authenticationProtocol = async (ctx) => {
  const cookies = parseCookies(ctx.req);
  try {
    const userData = await getUserData(cookies.token);
    return {
      props: { userData, token: cookies.token },
    };
  } catch (error) {
    try {
      const res = await refresh_token(cookies.refresh_token);

      if (res.token) {
        const cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token", res.token);
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
          props: {},
        };
      }
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
};
export default {
  register,
  login,
  logout,
  refresh_token,
  getUserData,
  authenticationProtocol,
};
