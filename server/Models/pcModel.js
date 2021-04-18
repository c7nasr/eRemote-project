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
    installedPrograms: {
      type: Array,
      default: [],
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