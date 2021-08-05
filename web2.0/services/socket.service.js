import io from "socket.io-client";
import { toast } from "react-toastify";

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
  return socket.emit("order", {
    room: key,
    order: order,
    source: source,
    orderid: orderId,
  });
};
export const handleConnectionState = (socket_state) => {
  if (!socket_state.is_connected)
    return toast.error("We can't reach our servers. try refresh the page");
  if (!socket_state.is_pc_connected)
    return toast.error("Your PC is Unreachable.");

  return false;
};
