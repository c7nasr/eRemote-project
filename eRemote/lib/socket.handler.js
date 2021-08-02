import io from 'socket.io-client';
import {check_if_key_existed, getTempKey} from './auth.handler';

export const initSocket = async () => {
  try {
    var KEY = await check_if_key_existed();

    if (KEY) {
      return io('https://ncontrol.herokuapp.com/', {
        query: `key=${KEY}&source=Mobile`,
      });
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
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
