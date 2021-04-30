import {
  NETWORK_ERROR,
  NETWORK_CALL_START,
  GET_POSTS_SUCCESS,
} from '../config.js';

const initialState = {loadingStatus: false};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loadingStatus: false,
      };

    case NETWORK_ERROR:
      return {
        ...state,
        loadingStatus: false,
      };

    case NETWORK_CALL_START:
      return {
        ...state,
        loadingStatus: true,
      };

    default:
      return state;
  }
};
