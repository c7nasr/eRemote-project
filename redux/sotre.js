import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root";

const initState = {
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
