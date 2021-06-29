const express = require("express");
const {
  getSecurityReports,
  getScreenshotsReports,
} = require("../Controllers/reports.controller");
const router = express.Router();

router.route("/security").post(getSecurityReports);
router.route("/screenshots").post(getScreenshotsReports);

module.exports = router;
