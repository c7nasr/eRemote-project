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
      default: false,
    },
    done: {
      type: Boolean,
      default: false,
    },
    media:{
      type:String,
      default:null
    }
  },
  { timestamps: true }
);

const Control = mongoose.model("Control", controlSchema);

module.exports = Control;
