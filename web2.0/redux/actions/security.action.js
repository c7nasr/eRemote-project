import ordersService from "../../services/orders.service";
import reportsService from "../../services/reports.service";
import { GET_SECURITY_HISTORY } from "../types";
import { TOGGLE_DESKTOP } from "./../types";

export const getHistory = (token) => async (dispatch) => {
  const data = await reportsService.securityHistoryRequest(token);
  if (data) {
    dispatch({
      type: GET_SECURITY_HISTORY,
      payload: { history: data.reports },
    });
  }
};
export const lockMyDesktop = (token, socket, key) => async (dispatch) => {
  const data = await ordersService.sendLockDesktopRequest(token, socket, key);
  if (data) {
    dispatch({
      type: TOGGLE_DESKTOP,
      payload: { status: true },
    });
  }
};
