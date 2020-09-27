const moment = require("moment");
exports.getKey = () => {
    return "nxxx-xxxx-xxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
exports.checkKeyValidity = (keyFromDb) => {
    const keyDoc = keyFromDb;
    if (keyDoc.matched)
        return {
            status: "failed",
            message: "Key is already Matched!",
            valid: false,
        };
    let startTime = moment(keyDoc.createdAt);
    let endTime = moment();
    let duration = moment.duration(endTime.diff(startTime));
    let hours = parseInt(duration.asHours());
    let minutes = parseInt(duration.asMinutes()) - hours * 60;

    console.log(minutes);

    if (minutes > 5)
        return {
            status: "failed",
            message: "Key Time Signature Not Correct. Generate New Key",
            valid: false,
        };

    return {status: "ok", valid: true};
};
