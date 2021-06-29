const mongoose = require("mongoose");

const controlSchema = new mongoose.Schema(
  {
    order: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    media: {
      type: String,
      default: null,
    },
    source_location: {
      type: Array,
      default: [0, 0],
    },
    source: {
      type: String,
      default: "Mobile",
    },
    pc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PC",
    },
    mobile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phone",
    },
  },
  { timestamps: true }
);

const Control = mongoose.model("Control", controlSchema);

module.exports = Control;
