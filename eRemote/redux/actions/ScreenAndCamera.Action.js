import {
  SCREENSHOT_HISTORY,
  SET_VIEWER_IMAGE,
  TAKE_SCREENSHOT,
  TOGGLE_VIEWER,
  CAMERA_HISTORY,
  TAKE_CAMERA,
} from '../config';

export const setIncomingScreenshot = (data, url) => {
  return dispatch => {
    dispatch({
      type: TAKE_SCREENSHOT,
      payload: {data, url},
    });
  };
};

export const setIncomingCamera = (data, url) => {
  return dispatch => {
    dispatch({
      type: TAKE_CAMERA,
      payload: {data, url},
    });
  };
};
export const getScreenshotHistory = data => {
  return dispatch => {
    dispatch({
      type: SCREENSHOT_HISTORY,
      payload: {
        history: data,
      },
    });
  };
};
export const getCameraHistory = data => {
  return dispatch => {
    dispatch({
      type: CAMERA_HISTORY,
      payload: {
        history: data,
      },
    });
  };
};
export const toggleImageViewer = statue => {
  return dispatch => {
    dispatch({
      type: TOGGLE_VIEWER,
      payload: {
        is_model_open: statue,
      },
    });
  };
};

export const setImageViewerImage = img => {
  return dispatch => {
    dispatch({
      type: SET_VIEWER_IMAGE,
      payload: {
        model_current_photo: img,
      },
    });
  };
};
