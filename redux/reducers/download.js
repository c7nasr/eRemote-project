

import { SET_DOWNLOAD_RATE } from "../actions/types";
const initState = {
  download_rate: 0,
};

export default download = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DOWNLOAD_RATE:
      return { 
        ...state,
        download_rate: payload.rate,
      };

    default:
      return state;
  }
};
