const express = require('express');
const Config = require("../Controllers/configController")


const router = express.Router();
router
    .route('/')
    .get(Config.get_config)
    .post(Config.set_config)

module.exports = router;