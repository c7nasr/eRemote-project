const User = require("../Models/userModel");
const Keys = require("../Controllers/keysController");
const Users = require("../Models/userModel");
const PC = require("../Models/pcModel");
const Phone = require("../Models/phoneModel");
exports.getKey = async (req, res) => {
    try {
        // Check if contains payload. delete old key
        if (req.body.oldKey) Users.findOneAndDelete({key: oldKey});
        const keyCreated = Keys.getKey();
        const key = await User.create({key: keyCreated});
        res.status(201).json({
            status: "OK",
            key,
        });
    } catch (error) {
        if (error) res.status(200).json({status: "failed", error});
    }
};

exports.connect = async (req, res) => {
    try {
        const key = req.body.key;
        const findKey = await User.findOne({key});
        // Typo check
        if (!key.startsWith("n") || key.length !== 14)
            return res.status(200).json({
                status: "failed",
                message: "Authentication Key Incorrect. Double Check it",
                valid: false,
            });
        if (!findKey)
            return res.status(200).json({
                status: "Authentication Key Incorrect. Double Check it",
                valid: false,
            });
        const keyValid = Keys.checkKeyValidity(findKey);
        if (keyValid.valid) {
            const match = await User.findOneAndUpdate(
                {key},
                {matched: true},
                {new: true}
            );
            console.log(match);
        } else {
            res.status(200).json(keyValid);
        }
    } catch (error) {
        if (error) res.status(200).json({status: "failed", error});
    }
};

exports.status = async (req, res) => {
    try {
        const key = req.query.key;
        const findKey = await User.findOne({key}).select("matched");
        if (!findKey)
            return res.status(200).json({status: "failed", matched: false});
        if (!findKey.matched)
            return res.status(200).json({status: "failed", matched: false});
        if (findKey.matched)
            return res.status(200).json({status: "ok", matched: true});
    } catch (error) {
        if (error) res.status(200).json({status: "failed", error});
    }
};

exports.existence = async (req, res) => {
    try {
        const key = req.body.key;
        const findKey = await User.findOne({key});
        if (!findKey)
            return res.status(200).json({status: "failed", error: "invalid"});
        if (findKey) {
            await User.findOneAndUpdate({key}, {matched: true});
            return res.status(200).json({status: "ok"});
        }
    } catch (error) {
        if (error) res.status(200).json({status: "failed", error});
    }
};

exports.sky_info = async (req, res) => {
    try {
        const data = req.body;
        const find_if_exist = await PC.findOne({key: data.key});

        if (find_if_exist) {
            await PC.findOneAndUpdate(
                {key: data.key},
                {
                    mic: data.mic,
                    cam: data.cam,
                    ip: data.ip,
                    mac_address: data.mac_address,
                    battery: data.battery,
                    battery_percentage: data.battery_percentage,
                },
                {new: true}
            );
        } else {
            await PC.create(data);
        }
        return res.sendStatus(200);
    } catch (error) {
        res.status(200).json({status: "failed", error});
    }
};
exports.get_info = async (req, res) => {
    try {
        const key = req.query.key;
        const find_if_exist = await PC.findOne({key: key});
        if (find_if_exist)
            return res.status(200).json({status: "ok", find_if_exist});
        return res.status(200).json({status: "failed", find_if_exist: "no info"});
    } catch (e) {
        res.status(200).json({status: "failed", e});
    }
};
exports.phone_info = async (req, res) => {
    try {
        const data = req.body;
        const findIfExisted = await Phone.findOne({key: data.key});

        if (findIfExisted) {
            await Phone.findOneAndUpdate({key: data.key}, {data});

        } else {
            await Phone.create(data);

        }
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(200).json({status: "failed", e});
    }
};

exports.get_notification_token = async (req, res) => {
    try {
        const {key} = req.body;
        const findIfExisted = await Phone.findOne({key: key});

        if (findIfExisted) {
            return res.status(200).json({status: "ok", token: findIfExisted.notificationToken});

        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        console.log(e);
        res.status(200).json({status: "failed", e});
    }
};
