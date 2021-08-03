import io from "socket.io-client";

export const connect_socket = (key) => {
  try {
    return io("http://127.0.0.1:5000/", {
      query: `key=${key}&source=Website`,
    });
  } catch (error) {
    console.log(error);
  }
};
export const emitOrder = (socket, key, order, orderId, source) => {
  socket.emit("order", {
    room: key,
    order: order,
    source: source,
    orderid: orderId,
  });
};
