import {START_MICROPHONE, STOP_MICROPHONE} from '../config';

export const StartMicrophone = () => {
  return dispatch => {
    dispatch({
      type: START_MICROPHONE,
    });
  };
};
export const StopMicrophone = () => {
  return dispatch => {
    dispatch({
      type: STOP_MICROPHONE,
    });
  };
};
