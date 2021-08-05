import axios from "axios";
import { toast } from "react-toastify";
import { emitOrder } from "./socket.service";
import { useDispatch, useSelector } from "react-redux";
import {
  TOGGLE_DESKTOP,
  UPDATE_INCOMING_DATA,
  UPDATE_INCOMING_STATUS,
} from "./../redux/types";
import React from "react";
import { b64toBlob } from "../functions/screenshot.functions";
const API_URL = "http://localhost:5000/api/order/";

const sendScreenshotRequest = async (token, dispatch, socket, key) => {
  try {
    toast.success("Incoming screenshot...");
    dispatch({
      type: UPDATE_INCOMING_STATUS,
    });

    const { data } = await axios.post(
      API_URL + "new",
      { order: "INSTANT_SCREEN", source: "Website V2.0" },
      {
        headers: {
          "content-type": "application/json",
          "x-access-token": token,
        },
      }
    );
    emitOrder(socket, key, "INSTANT_SCREEN", data.order._id);

    return "";
  } catch (error) {
    toast.error("Session Expired. Please Refresh the page");
  }
};

const sendLockDesktopRequest = async (token, socket, key) => {
  try {
    toast.warning("Locking your desktop...");

    const { data } = await axios.post(
      API_URL + "new",
      { order: "INSTANT_LOCK", source: "Website V2.0" },
      {
        headers: {
          "content-type": "application/json",
          "x-access-token": token,
        },
      }
    );
    const is_emitted = emitOrder(socket, key, "INSTANT_LOCK", data.order._id);
    if (is_emitted) {
      toast.success("Desktop Locked.");
      return true;
    }
    toast.error(
      "It's not your fault. something went error. mostly refresh the page is enough for resolving this issue"
    );
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Session Expired. Please Refresh the page");
  }
};

const addScreenshotListener = async () => {
  const socket_state = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      if (socket_state.is_connected) {
        socket_state.socket.on("SCREENSHOT_IMAGE", function (object) {
          console.log(object);
          toast.success("Received a Screenshot.");
          const blob = b64toBlob(object.data, "image/png");
          const blobUrl = URL.createObjectURL(blob);

          // const blob = new Blob([object.data], { type: "image/png" });
          // const url = URL.createObjectURL(blob);
          dispatch({
            type: UPDATE_INCOMING_DATA,
            payload: {
              data: blobUrl,
            },
          });
        });
      }
      // const socket_state = useSelector((state) => state.socket);
    } catch (error) {
      console.log(error);
      toast.error("Session Expired. Please Refresh the page");
    }
  }, [socket_state.is_connected]);
};

const addDesktopLockerListener = async () => {
  const socket_state = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      if (socket_state.is_connected) {
        socket_state.socket.on("DESKTOP_LOCKED", function (object) {
          dispatch({
            type: TOGGLE_DESKTOP,
            payload: {
              status: true,
            },
          });
        });
        socket_state.socket.on("DESKTOP_UNLOCKED", function (object) {
          dispatch({
            type: TOGGLE_DESKTOP,
            payload: {
              status: false,
            },
          });
        });
      }
      // const socket_state = useSelector((state) => state.socket);
    } catch (error) {
      console.log(error);
      toast.error("Session Expired. Please Refresh the page");
    }
  }, [socket_state.is_connected]);
};

export default {
  sendScreenshotRequest,
  addScreenshotListener,
  addDesktopLockerListener,
  sendLockDesktopRequest,
};
