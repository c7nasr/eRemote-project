import {UPDATE_SECURITY_REPORTS} from '../config.js';

const initialState = {
  loadingStatus: true,
  security: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SECURITY_REPORTS:
      return {
        ...state,
        loadingStatus: false,
        security: action.payload.security,
      };

    default:
      return state;
  }
};
