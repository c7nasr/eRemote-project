import { SET_DOWNLOAD_RATE } from "../actions/types";
export const set_download_rate = (rate) => async (dispatch) => {
  try {
    dispatch({
      type: SET_DOWNLOAD_RATE,
      payload: {
        rate: rate,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
