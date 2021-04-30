import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import {AsyncStorage} from '@react-native-community/async-storage';
import {persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
export default function configureStore() {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
}
