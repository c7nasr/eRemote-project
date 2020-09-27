const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      default: null,
    },
    modelName: {
      type: String,
      default: null,
    },
    osName: {
      type: String,
      default: null,
    },
    osVersion: {
      type: String,
      default: null,
    },
    notificationToken: {
      type: String,
      default: null,
    },
    key: {
      type: String,
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

const Phone = mongoose.model("Phone", PhoneSchema);

module.exports = Phone;
