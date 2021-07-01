import {POWER_HISTORY} from '../config.js';

const initialState = {
  loadingStatus: true,
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POWER_HISTORY:
      return {
        ...state,
        loadingStatus: false,
        history: action.payload.history,
      };

    default:
      return state;
  }
};
