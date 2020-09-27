import { CREATE_ORDER, GET_RANSOM_LOCKER_HISTORY } from "../actions/types";
const initState = {
  ransom_history: 0,
};

export default order = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORDER:
      return {
        ...state,
      };
    case GET_RANSOM_LOCKER_HISTORY:
      return {
        ...state,
        ransom_history: payload.ransom_history,
      };
    default:
      return state;
  }
};
