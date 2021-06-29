const express = require("express");
const emergency = require("../Controllers/emergency.contoller");
const router = express.Router();

router.route("/state").get(emergency.check_ransom_locker);
router.route("/status").post(emergency.check_if_locked);

router.route("/history").get(emergency.get_ransom_history);
router.route("/unlock").post(emergency.un_lock_the_sky);
router.route("/logs").post(emergency.register_tries);

module.exports = router;
