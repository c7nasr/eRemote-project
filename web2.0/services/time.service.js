const moment = require("moment");

exports.formatTime = (date) => {
  return moment(date).format("DD MMMM YYYY@h:mm:ss a");
};
exports.formatTimeAgo = (date) => {
  return moment(date).fromNow();
};
exports.capitalizeFirstLetter = (string) => {
  if (string) return string[0].toUpperCase() + string.slice(1).toLowerCase();

  return "";
};
