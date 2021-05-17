import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

import {persistStore, persistReducer} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  let persistor = persistStore(store);

  return {store, persistor};
}
