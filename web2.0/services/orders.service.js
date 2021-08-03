import axios from "axios";
import { toast } from "react-toastify";
import { emitOrder } from "./socket.service";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_INCOMING_DATA, UPDATE_INCOMING_STATUS } from "./../redux/types";
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

export default { sendScreenshotRequest, addScreenshotListener };
