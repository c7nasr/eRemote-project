const express = require("express");
const Order = require("../Controllers/order.controller.js");

const router = express.Router();
// router.route("/status-app-update").post(info.status_update);
// router.route("/list-media-of-requests").get(info.get_requests_media);
// router.route("/last-power-request").get(info.get_last_power_request);
// router.route("/last-lock-request").get(info.get_last_windows_lock);

router.route("/check").post(Order.checkOrderStatus);
router.route("/new").post(Order.createOrder);
router.route("/update-location").post(Order.updateOrderLocation);
router.route("/done").post(Order.updateOrder);

module.exports = router;
