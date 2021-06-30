import {
  TAKE_SCREENSHOT,
  SCREENSHOT_HISTORY,
  TOGGLE_VIEWER,
  SET_VIEWER_IMAGE,
  CAMERA_HISTORY,
  TAKE_CAMERA,
} from '../config.js';

const initialState = {
  model_current_photo: '',

  loadingStatus: true,
  screenshot_history: [],
  camera_history: [],
  is_model_open: false,
  incoming_screenshot: {
    data: {},
    base_url: '',
  },
  incoming_camera_shot: {
    data: {},
    base_url: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TAKE_SCREENSHOT:
      return {
        ...state,
        loadingStatus: false,
        incoming_screenshot: {
          data: action.payload.data,
          base_url: action.payload.url,
        },
      };
    case SCREENSHOT_HISTORY:
      return {
        ...state,
        loadingStatus: false,
        screenshot_history: action.payload.history,
      };

    case CAMERA_HISTORY:
      return {
        ...state,
        loadingStatus: false,
        camera_history: action.payload.history,
      };

    case TAKE_CAMERA:
      return {
        ...state,
        loadingStatus: false,
        incoming_camera_shot: {
          data: action.payload.data,
          base_url: action.payload.url,
        },
      };
    case TOGGLE_VIEWER:
      return {
        ...state,
        is_model_open: action.payload.is_model_open,
      };
    case SET_VIEWER_IMAGE:
      return {
        ...state,
        model_current_photo: action.payload.model_current_photo,
      };
    default:
      return state;
  }
};
