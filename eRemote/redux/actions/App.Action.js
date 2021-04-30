import network from '../../network';
import {
  NETWORK_ERROR,
  NETWORK_CALL_START,
  GET_POSTS_SUCCESS,
} from '../config.js';

export const getPostsAPI = () => {
  return dispatch => {
    // Network call Start
    dispatch({type: NETWORK_CALL_START});
    network
      .getPosts()
      .then(response => {
        dispatch({
          type: GET_POSTS_SUCCESS,
          payload: response,
        });
      })
      .catch(error => {
        dispatch({
          type: NETWORK_ERROR,
        });
      });
  };
};
