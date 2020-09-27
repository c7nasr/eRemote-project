const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema(
    {
        client_version: {
            type: String,
            default: null,
        },
        website_link: {
            type: String,
            default: null,
        },
        app_link: {
            type: String,
            default: null,
        },
        client_direct_link: {
            type: String,
            default: null,
        },

    },
    { timestamps: true }
);

const Config_App = mongoose.model("ConfigApp", ConfigSchema);

module.exports = Config_App;
