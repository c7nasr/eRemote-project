const mongoose = require("mongoose");

const LockSchema = new mongoose.Schema(
  {
    locked: {
      type: Boolean,
      default: false,
    },
    key: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Control",
    },
    pc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PC",
    },
    mobile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phone",
    },
    code: {
      type: String,
    },
    source_location: {
      type: String,
      default: "Location Where this Request Made Lat,Lan",
    },
    unlock_pc_location: {
      type: String,
      default: "Location Where the pc located when unlocked",
    },
    unlock_client_location: {
      type: String,
      default: "Location Where the Client located when Unlockpc",
    },
    tries: [
      {
        try_time: { type: String },
        image: { type: String },
        try_password: { type: String },
        try_location: {
          type: String,
        },
        try_ip: {
          type: String,
        },
        g_id: { type: String },
      },
    ],
    camera: {
      type: Boolean,
    },
    g_id: {
      type: String,
    },
    lock_location: {
      type: String,
    },
    lock_ip: {
      type: String,
    },
    tries_count: {
      type: Number,
      default: 0,
    },
    last_try: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Lock = mongoose.model("Lock", LockSchema);

module.exports = Lock;
