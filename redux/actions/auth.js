import connect_control from "../../api/api";
import { CHECK_MATCHED,  GET_KEY } from "./types";
import { AsyncStorage } from "react-native";
export const check_if_matched = (key) => async (dispatch) => {
  try {
    console.log(key)
    const res = await connect_control.get("users/status?key=" + key);
    const { matched } = res.data;
    dispatch({
      type: CHECK_MATCHED,
      payload: {
        key: key,
        matched: matched,
      },
    });
    if (matched) {
      await AsyncStorage.setItem("key", key);
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const Get_new_key = () => async (dispatch) => {
  try {
    const res = await connect_control.get("users/connect");
    const { status, key } = res.data;
    if (status === "OK") {
      dispatch({
        type: GET_KEY,
        payload: {
          key: key.key,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const Check_Key_From_Storage = () => async (dispatch) => {
  const get_key_from_storage = await AsyncStorage.getItem("key");

  if (get_key_from_storage) {
    dispatch({
      type: CHECK_MATCHED,
      payload: {
        key: get_key_from_storage,
        matched: true,
      },
    });
    return true;
  } else {
    dispatch({
      type: CHECK_MATCHED,
      payload: {
        key: "",
        matched: false,
      },
    });
    return false;
  }
};
