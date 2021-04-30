import {GET_AUTH_STATUS, UPDATE_AUTH_STATE} from '../config.js';

const initialState = {loadingStatus: false, is_auth: false, is_token: false};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_STATUS:
      return {
        ...state,
      };
    case UPDATE_AUTH_STATE:
      return {
        ...state,
        is_auth: action.payload.is_auth,
        is_token: action.payload.is_token,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
