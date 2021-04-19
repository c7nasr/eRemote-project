const express = require("express");
const User = require("../Controllers/userController");

const router = express.Router();
router.route("/connect").post(User.connect).get(User.getKey);

router.route("/LockLogs").post(User.sync_locks_logs);

router.route("/status").get(User.status).post(User.existence);

router.route("/sky-info").post(User.sky_info).get(User.get_info);
router.route("/phone-info").post(User.phone_info);
router.route("/get-notification-token").post(User.get_notification_token);

module.exports = router;

//TODO: Working on orders
