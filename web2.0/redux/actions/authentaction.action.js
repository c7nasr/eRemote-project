import authenticationService from "../../services/authentication.service";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
} from "./../types";

export const register = (email, password) => (dispatch) => {
  return authenticationService.register(email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: REGISTER_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const login_action = (email, password) => async (dispatch) => {
  const login_req = await authenticationService.login(email, password);
  if (login_req.status === "failed") {
    dispatch({
      type: LOGIN_FAIL,
    });

    return login_req;
  }
  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user: login_req },
  });
  return login_req;
};

export const logout = () => (dispatch) => {
  authenticationService.logout();

  dispatch({
    type: LOGOUT,
  });
};
