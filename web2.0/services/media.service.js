const { emitOrder } = require("./socket.service");
import { toast } from "react-toastify";

export const MutePC = async (socket_state, key) => {
  try {
    const emitMute = await emitOrder(
      socket_state.socket,
      key,
      "MUTE_THE_SKY",
      "",
      ""
    );
    console.log(emitMute);
    if (emitMute) return true;
    return toast.error("Something went error.");
  } catch (error) {
    return toast.error("Something went error.");
  }
};

export const ForwardMedia = async (socket_state, key) => {
  try {
    const emitNext = await emitOrder(
      socket_state.socket,

      key,
      "MEDIA",
      "NEXT_MEDIA",

      ""
    );

    if (emitNext) return true;
    return toast.error("Something went error.");
  } catch (error) {
    return toast.error("Something went error.");
  }
};
export const BackMedia = async (socket_state, key) => {
  try {
    const emitBack = await emitOrder(
      socket_state.socket,
      key,
      "MEDIA",
      "PERVIOUS_MEDIA",

      ""
    );

    if (emitBack) return true;
    return toast.error("Something went error.");
  } catch (error) {
    return toast.error("Something went error.");
  }
};
export const PlayPause = async (socket_state, key) => {
  try {
    const emitPlayPause = await emitOrder(
      socket_state.socket,

      key,
      "MEDIA",
      "PLAY_PAUSE",
      ""
    );

    if (emitPlayPause) return true;
    return toast.error("Something went error.");
  } catch (error) {
    return toast.error("Something went error.");
  }
};
export const SpeakerVolume = async (socket_state, key, e) => {
  try {
    const emitSpeakerVolume = await emitOrder(
      socket_state.socket,

      key,
      "VOICE_THE_SKY",
      "",
      e.toFixed(0)
    );
    if (emitSpeakerVolume) return true;
    return toast.error("Something went error.");
  } catch (error) {
    console.log(error);
    return toast.error("Something went error.");
  }
};

export const StartMicrophone = (socket_state, key, opt = 0.1) => {
  try {
    socket_state.socket.emit("order", {
      key: key,
      order: "AUDIO_CHUNKS",
      room: key,
      orderid: opt,
    });
    return toast.success("Voice Transmission started.");
  } catch (error) {
    return toast.error("Something went error.");
  }
};
export const StopMicrophone = (socket_state, key) => {
  try {
    socket_state.socket.emit("order", {
      key: key,
      order: "STOP_LISTEN",
      room: key,
    });
    return toast.warning("Voice Transmission ended.");
  } catch (error) {
    return toast.error("Something went error.");
  }
};
