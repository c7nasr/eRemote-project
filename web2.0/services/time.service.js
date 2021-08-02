const moment = require("moment");

exports.formatTime = (date) => {
  return moment(date).format("DD MMMM YYYY@h:mm:ss a");
};
exports.formatTimeAgo = (date) => {
  return moment(date).fromNow();
};
