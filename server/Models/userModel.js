const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    matched: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: mongoose.Schema.ObjectId,
      ref: "Phone",
    },
    pc: {
      type: mongoose.Schema.ObjectId,
      ref: "PC",
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
