import {
  REFRESH_INFO,
  GET_CURRENT_ORDERS,
  RESET_CURRENT_ORDERS,
  UPDATE_STATUS,
  GET_PAST_REQUESTS,
  GET_LAST_POWER,
} from "../actions/types";
const initState = {
  key: "",
  loading: true,
  matched: false,
  order: {},
  status: {},
  past: {},
  last_power: {},
};

export default control = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REFRESH_INFO:
      return {
        ...state,
        loading: false,
        info: payload.info,
        matched: true,
        info_state: "done",
      };
    case GET_CURRENT_ORDERS:
      return {
        ...state,
        loading: false,
        order: payload.info,
        matched: true,
      };
    case RESET_CURRENT_ORDERS:
      return {
        ...state,
        loading: true,
        order: {},
        matched: true,
      };

    case UPDATE_STATUS:
      return {
        ...state,
        loading: false,
        status: payload.status,
      };
    case GET_PAST_REQUESTS:
      return {
        ...state,
        loading: false,
        past: payload.past,
      };

    case GET_LAST_POWER:
      return {
        ...state,
        loading: false,
        last_power: payload.last_power,
      };
    default:
      return state;
  }
};
