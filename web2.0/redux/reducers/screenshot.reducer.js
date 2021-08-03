import {
  UPDATE_INCOMING_STATUS,
  UPDATE_INCOMING_DATA,
  GET_SCREENSHOT_HISTORY,
} from "../types";

const initialState = {
  is_loading: true,
  incoming_screenshot: {
    is_incoming: false,
    data: "",
  },
  history: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SCREENSHOT_HISTORY:
      return {
        ...state,
        history: payload.history,
        is_loading: false,
      };
    case UPDATE_INCOMING_DATA:
      return {
        ...state,
        incoming_screenshot: {
          is_incoming: false,
          data: payload.data,
        },
      };
    case UPDATE_INCOMING_STATUS:
      return {
        ...state,
        incoming_screenshot: {
          is_incoming: true,
          data: "",
        },
      };
    default:
      return state;
  }
}
