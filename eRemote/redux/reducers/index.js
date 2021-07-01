import {combineReducers} from 'redux';
import App from './App';
import Auth from './Auth';
import Toast from './Toast';
import PC from './PC';
import Socket from './Socket';
import Reports from './Reports';
import {persistReducer} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';
import ScreenAndCamera from './ScreenAndCamera';
import Power from './Power';

const AppPersistConfig = {
  key: 'App',
  storage: EncryptedStorage,
  keyPrefix: '',
};
const PCPersistConfig = {
  key: 'PC',
  storage: EncryptedStorage,
  blacklist: ['is_connected'],
};

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  blacklist: [''],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    Auth,
    App: persistReducer(AppPersistConfig, App),
    PC: persistReducer(PCPersistConfig, PC),
    Toast,
    Socket,
    Reports,
    ScreenAndCamera,
    Power,
  }),
);

export default persistedReducer;
