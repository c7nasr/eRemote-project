import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  LOAD_USER_FAILS,
} from "../types";

const user = "";

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOAD_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOAD_USER_FAILS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
