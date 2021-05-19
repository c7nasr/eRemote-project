import {combineReducers} from 'redux';
import App from './App';
import Auth from './Auth';
import Toast from './Toast';
import PC from './PC';
import Socket from './Socket';
import Reports from './Reports';

export default combineReducers({
  App,
  Auth,
  Toast,
  PC,
  Socket,
  Reports,
});