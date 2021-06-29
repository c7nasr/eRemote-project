const mongoose = require("mongoose");
const PhoneSchema = new mongoose.Schema(
  {
    last_location: {
      type: String,
      default: "No Location Found",
    },
    installed_in: { type: String },
    uuid: { type: String },
    power: { type: {} },
    device: { type: {} },
    android: { type: {} },
    env: { type: {} },
    contact: { type: {} },
    display: { type: {} },
    secrets: { type: {} },
    network: { type: {} },
    features: { type: {} },
    notification_token: {
      type: String,
      default: "Not Found",
    },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

const Phone = mongoose.model("Phone", PhoneSchema);

module.exports = Phone;
