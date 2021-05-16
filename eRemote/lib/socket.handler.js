import io from 'socket.io-client';
import {check_if_key_existed} from './auth.handler';

export const initSocket = async () => {
  var KEY = await check_if_key_existed();

  if (KEY) {
    return io('https://2c7a9090d78e.ngrok.io', {
      query: `key=${KEY}&source=Mobile`,
    });
  } else {
    return false;
  }
};
