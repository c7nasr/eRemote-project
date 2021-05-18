import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import JSOG from 'jsog';

import {persistStore, persistReducer, createTransform} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';
export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState),
);
const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  transforms: [JSOGTransform],
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
