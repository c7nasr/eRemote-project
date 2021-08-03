import { GET_SCREENSHOT_HISTORY } from "./../types";
import reportsService from "../../services/reports.service";
import ordersServices from "../../services/orders.service";
export const getHistory = (token) => async (dispatch) => {
  const data = await reportsService.screenshotHistoryRequest(token);
  if (data) {
    dispatch({
      type: GET_SCREENSHOT_HISTORY,
      payload: { history: data.screenshots },
    });
  }
};
export const getScreenshot = (token, key, socket) => async (dispatch) => {
  await ordersServices.sendScreenshotRequest(token, dispatch, socket, key);
};
