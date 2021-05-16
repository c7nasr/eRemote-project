import {combineReducers} from 'redux';
import App from './App';
import Auth from './Auth';
import Toast from './Toast';
import PC from './PC';

export default combineReducers({
  App,
  Auth,
  Toast,
  PC,
});
