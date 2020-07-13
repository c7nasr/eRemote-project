import {
  REFRESH_INFO,
  GET_CURRENT_ORDERS,
  RESET_CURRENT_ORDERS,
  UPDATE_STATUS,
  GET_PAST_REQUESTS,
} from "./types";
import connect_control from "../../api/api";

export const get_pc_info = (key) => async (dispatch) => {
  try {
    const res = await connect_control.post("control/new", {
      key: key,
      order: "GET_SKY_INFO",
      active: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const check_if_info = (key) => async (dispatch) => {
  try {
    const res = await connect_control.get("users/sky-info?key=" + key);
    const { status, find_if_exist } = res.data;
    if (status === "failed") {
      await connect_control.post("control/new", {
        key: key,
        order: "GET_SKY_INFO",
        active: true,
      });
      dispatch({
        type: REFRESH_INFO,
        payload: {
          info: find_if_exist,
        },
      });
    } else {
      dispatch({
        type: REFRESH_INFO,
        payload: {
          info: find_if_exist,
        },
      });
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const check_if_order = (key) => async (dispatch) => {
  try {
    const res = await connect_control.post("control/check", {
      key: key,
    });

    const { status, order } = res.data;
    if (order === null) {
      dispatch({
        type: GET_CURRENT_ORDERS,
        payload: {
          info: {},
        },
      });
    } else {
      dispatch({
        type: GET_CURRENT_ORDERS,
        payload: {
          info: order,
        },
      });
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const reset_order_status = () => async (dispatch) => {
  try {
    dispatch({
      type: RESET_CURRENT_ORDERS,
      payload: {
        order: {},
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const update_status = (key) => async (dispatch) => {
  try {
    const res = await connect_control.post("control/status-app-update", {
      key: key,
    });

    const { status } = res.data;

    dispatch({
      type: UPDATE_STATUS,
      payload: {
        status: status,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_past_requests = (key, type, one = false) => async (
  dispatch
) => {
  try {
    const res = await connect_control.get(
      "control/list-media-of-requests?key=" + key + "&type=" + type
    );

    const { requests_media } = res.data;
    if (one) {
      if (requests_media.dates.length != 0) {
        dispatch({
          type: GET_PAST_REQUESTS,
          payload: {
            past: requests_media.dates[0],
          },
        });
      } else {
        dispatch({
          type: GET_PAST_REQUESTS,
          payload: {
            past: "notfound",
          },
        });
      }
    } else {
      dispatch({
        type: GET_PAST_REQUESTS,
        payload: {
          past: requests_media,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};