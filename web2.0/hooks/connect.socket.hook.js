import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/authentaction.action";
import { connect_action } from "../redux/actions/socket.action";
import authenticationService from "../services/authentication.service";
import { updatePcConnectionState } from "./../redux/actions/socket.action";

export const useConnectSocket = (userData) => {
  const dispatch = useDispatch();

  const key = userData.user.key;
  const socket_state = useSelector((state) => state.socket);

  React.useEffect(() => {
    console.time();
    if (!socket_state.socket.connected) {
      dispatch(connect_action(userData.user.key));
    }
    dispatch(loadUser(userData.user));

    console.timeEnd();
  }, [userData]);

  return [socket_state.socket.connected];
};
export const addSocketListener = (token) => {
  const socket_state = useSelector((state) => state.socket);
  const user_state = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (socket_state.is_connected === true && !socket_state.is_pc_connected) {
      socket_state.socket.on("turn_on", function () {
        dispatch(updatePcConnectionState(true));
      });
      socket_state.socket.on("emitIsActive", async function (data) {
        if (
          data.key == user_state.key &&
          !data.isActive &&
          data.source == "desktop"
        ) {
          dispatch(updatePcConnectionState(false));
        } else if (
          data.key == user_state.key &&
          data.isActive &&
          data.source == "desktop"
        ) {
          dispatch(updatePcConnectionState(true));
        }
      });
      socket_state.socket.emit("isActive", {
        key: user_state.key,
        source: "Website",
      });
      socket_state.socket.on("UPDATED_INFO", async function ({ room }) {
        if (room === user_state.key) {
          const userData = await authenticationService.getUserData(token);
          dispatch(loadUser(userData.user));
        }
      });
    }
  }, [socket_state.is_connected]);
};
