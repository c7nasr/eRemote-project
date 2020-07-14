import {
  REFRESH_INFO,
  GET_CURRENT_ORDERS,
  RESET_CURRENT_ORDERS,
  UPDATE_STATUS,
  GET_PAST_REQUESTS,
  GET_LAST_POWER,
  GET_LAST_LOCK,
  GET_RANSOM_LOCK_STATE,
  RESET_PAST_STATE,
  GET_PAST_SCREENSHOTS,
  GET_PAST_REQUEST_FOR_EVERY_CONTROL,
} from "../actions/types";
const initState = {
  key: "",
  loading: true,
  matched: false,
  order: {},
  status: {},
  past: "",
  past_r: "",
  last_power: {},
  last_lock: {},
  ransom_lock_state: {},
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

    case GET_LAST_LOCK:
      return {
        ...state,
        loading: false,
        last_lock: payload.last_lock,
      };
    case GET_RANSOM_LOCK_STATE:
      return {
        ...state,
        loading: false,
        ransom_lock_state: payload.ransom_lock_state,
      };
    case RESET_PAST_STATE:
      return {
        ...state,
      };
    case GET_PAST_REQUEST_FOR_EVERY_CONTROL:
      return {
        ...state,
        past_r: payload.past
        
      };
    default:
      return state;
  }
};
