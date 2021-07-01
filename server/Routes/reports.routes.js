const express = require("express");
const {
  getSecurityReports,
  getScreenshotsReports,
  getCameraReports,
  getPowerReports,
} = require("../Controllers/reports.controller");
const router = express.Router();

router.route("/security").post(getSecurityReports);
router.route("/screenshots").post(getScreenshotsReports);
router.route("/camera").post(getCameraReports);
router.route("/power").post(getPowerReports);

module.exports = router;
