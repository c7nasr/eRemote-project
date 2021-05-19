import io from 'socket.io-client';
import {check_if_key_existed, getTempKey} from './auth.handler';

export const initSocket = async () => {
  var KEY = await check_if_key_existed();

  if (KEY) {
    return io('https://e07f73d54012.ngrok.io', {
      query: `key=${KEY}&source=Mobile`,
    });
  } else {
    return false;
  }
};

export const emitOrder = async (socket, order, orderId, source) => {
  socket.emit('order', {
    room: await getTempKey(),
    order: order,
    source: source,
    orderid: orderId,
  });
};
