import { GET_SECURITY_HISTORY } from "../types";
import { TOGGLE_DESKTOP } from "./../types";

const initialState = {
  is_loading: true,
  is_desktop_locked: false,
  is_ransom_locked: false,
  history: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECURITY_HISTORY:
      return {
        ...state,
        history: payload.history,
        is_loading: false,
      };
    case TOGGLE_DESKTOP:
      return {
        ...state,
        is_desktop_locked: payload.status,
      };

    default:
      return state;
  }
}
