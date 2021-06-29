const jwt = require("jsonwebtoken");

exports.signKey = (key) => {
  return jwt.sign({ key }, process.env.JWT_SECRET);
};
exports.unSignKey = (payload) => {
  try {
    return jwt.decode(payload, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};
