const moment = require("moment");

exports.formatTime = (date, format = "DD MMMM YYYY@h:mm:ss a") => {
  return moment(date).format(format);
};
exports.formatTimestamp = (date, format = "DD MMMM YYYY@h:mm:ss a") => {
  var timestamp = date / 1;
  var date_js = new Date(timestamp);
  return this.formatTime(date_js, format);
};
exports.formatTimeAgo = (date) => {
  return moment(date).fromNow();
};

exports.capitalizeFirstLetter = (string) => {
  if (string) return string[0].toUpperCase() + string.slice(1).toLowerCase();

  return "";
};
