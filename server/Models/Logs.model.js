const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
    },
    LockLogs: [
      {
        ID: {
          type: String,
        },
        timestamp: {
          type: String,
        },
        type: {
          type: Number,
          enum: [1, 0],
        },
        source: {
          type: String,
        },
        ip: {
          type: String,
        },
        local_ip: {
          type: String,
        },
        location: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Logs = mongoose.model("Logs", LogsSchema);

module.exports = Logs;
