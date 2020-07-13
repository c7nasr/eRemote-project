import { CHECK_MATCHED, REFRESH_INFO, GET_KEY } from "../actions/types";
const initState = {
  key: "",
  loading: true,
  matched: false,
  info: {},
};

export default auth = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHECK_MATCHED:
      return {
        ...state,
        loading: false,
        key: payload.key,
        matched: payload.matched,
      };
    case REFRESH_INFO:
      return {
        ...state,
        loading: false,
        info: payload.info,
      };

    case GET_KEY:
      return {
        ...state,
        loading: false,
        key: payload.key,
      };

    default:
      return state;
  }
};
