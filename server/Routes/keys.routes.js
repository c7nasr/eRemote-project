const express = require("express");
const Keys = require("../Controllers/keys.controller");

const router = express.Router();
router.route("/").get(Keys.getKey);
router.route("/connect/pc").post(Keys.connect_pc);
router.route("/connect/phone").post(Keys.connect_phone);

// router.route("/del").get(Keys.delete);
module.exports = router;
