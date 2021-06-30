const express = require("express");
const {
  getSecurityReports,
  getScreenshotsReports,
  getCameraReports,
} = require("../Controllers/reports.controller");
const router = express.Router();

router.route("/security").post(getSecurityReports);
router.route("/screenshots").post(getScreenshotsReports);
router.route("/camera").post(getCameraReports);

module.exports = router;
