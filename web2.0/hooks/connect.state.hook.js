import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/authentaction.action";
import authenticationService from "../services/authentication.service";
import { updatePcConnectionState } from "./../redux/actions/socket.action";

const useActiveState = (key, token) => {
  const dispatch = useDispatch();
  const socket_state = useSelector((state) => state.socket);

  return [socket_state.is_pc_connected];
};

export default useActiveState;
