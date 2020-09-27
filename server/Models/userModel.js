const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    pcInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PC",
      default:null

    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    matched: {
      type: Boolean,
      required: true,
      default: false,
    },
    phoneInfo: {
      type: mongoose.Schema.ObjectId,
      ref: "Phone",
      default:null

    },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
