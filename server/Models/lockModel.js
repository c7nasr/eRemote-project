const mongoose = require("mongoose");

const LockSchema = new mongoose.Schema(
    {
        locked: {
            type: Boolean,
            default: false,
        },
        key: {
            type: String,
            required: true,
        },
        code: {
            type: String,
        },
        media: {
            type: Array
        }
    },
    {timestamps: true}
);

const Lock = mongoose.model("Lock", LockSchema);

module.exports = Lock;
