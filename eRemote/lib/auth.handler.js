import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {tryToConnect} from './api';
export const check_if_key_existed = async () => {
  try {
    const token = await EncryptedStorage.getItem('user_token');
    if (token !== undefined) {
      return token;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
// Create Anti Spam Token Valid for 5 seconds
export const authHandler = async () => {
  const token = await check_if_key_existed();
  if (token) {
    // token Existed. Let's Get check it on Back End
    const is_valid = await tryToConnect(token);
    if (is_valid.matched) {
      return 'Matched';
    } else if (!is_valid.matched) {
      return 'Not Matched';
    } else {
      return 'Not Valid';
    }
  } else {
    return 'No Token';
  }
};

export const setToken = async token => {
  try {
    await EncryptedStorage.setItem('user_token', token);
    return token;
  } catch (error) {
    return false;
  }
};
