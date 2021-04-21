const mongoose = require("mongoose");

const PCSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    last_location: {
      type: String,
      default: null,
    },
    is_desktop_locked: {
      type: Boolean,
      default: false,
    },
    is_have_speakers: {
      type: Boolean,
      default: false,
    },
    current_volume: {
      type: String,
      default: "0",
    },
    cpu: {
      type: String,
      default: null,
    },
    gpu: {
      type: String,
      default: null,
    },
    ip: {
      type: String,
      default: null,
    },
    key: {
      type: String,
      required: true,
      default: null,
    },
    system: {
      type: String,
      default: null,
    },
    ram: {
      type: String,
      default: null,
    },
    cam: {
      type: Boolean,
      default: false,
    },
    mic: {
      type: Boolean,
      default: false,
    },
    mac_address: {
      type: String,
      default: null,
    },
    battery: {
      type: Boolean,
      default: false,
    },
    battery_percentage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const PC = mongoose.model("PC", PCSchema);

module.exports = PC;
