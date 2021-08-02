import {START_MICROPHONE, STOP_MICROPHONE} from '../config.js';

const initialState = {
  is_live: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_MICROPHONE:
      return {
        ...state,
        is_live: true,
      };
    case STOP_MICROPHONE:
      return {
        ...state,
        is_live: false,
      };

    default:
      return state;
  }
};
