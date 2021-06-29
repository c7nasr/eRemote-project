const PC = require("../Models/pcModel");
const Phone = require("../Models/phoneModel");
const Logs = require("../Models/Logs.model");
const { unSignKey } = require("../funcations/jwt.lib");

exports.sky_info = async (req, res) => {
  try {
    const data = req.body;
    const find_if_exist = await PC.findOne({ key: data.key });

    if (find_if_exist) {
      await PC.findOneAndUpdate(
        { key: data.key },
        {
          mic: data.mic,
          cam: data.cam,
          ip: data.ip,
          mac_address: data.mac_address,
          battery: data.battery,
          battery_percentage: data.battery_percentage,
          last_location: data.last_location,
          is_desktop_locked: data.is_desktop_locked,
          is_have_speakers: data.is_have_speakers,
          current_volume: data.current_volume,
        },
        { new: true }
      );
    } else {
      await PC.create(data);
    }
    return res.sendStatus(200);
  } catch (error) {
    res.status(200).json({ status: "failed", error });
  }
};
exports.get_info = async (req, res) => {
  try {
    // JWToken
    const token = req.headers.token;
    if (!token) return res.sendStatus(401);
    const is_valid = unSignKey(token);
    if (!is_valid) return res.sendStatus(401);

    if (token && is_valid) {
      // Check in DB
      const data = await PC.findOne({ key: is_valid.key });
      if (data) return res.status(200).json({ status: "ok", data });
    } else {
      return res.sendStatus(401);
    }

    return res.sendStatus(404);
  } catch (e) {
    return res.status(200).json({ status: "failed", e });
  }
};
exports.phone_info = async (req, res) => {
  try {
    let { data } = req.body;
    const token = req.headers.token;

    if (!token) return res.sendStatus(401);
    const token_data = unSignKey(token);
    if (!token_data) return res.sendStatus(401);
    const findIfExisted = await Phone.findOne({ key: token_data.key });
    if (findIfExisted) {
      await Phone.findOneAndUpdate({ key: token_data.key }, { data });
    } else {
      data.key = token_data.key;
      await Phone.create(data);
    }
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(200).json({ status: "failed", e });
  }
};

exports.get_notification_token = async (req, res) => {
  try {
    const { key } = req.body;
    const findIfExisted = await Phone.findOne({ key: key });

    if (findIfExisted) {
      return res
        .status(200)
        .json({ status: "ok", token: findIfExisted.notificationToken });
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({ status: "failed", e });
  }
};

exports.sync_locks_logs = async (req, res) => {
  try {
    const { key, ID, type, timestamp, source, ip, local_ip, location } =
      req.body;
    const is_existed = await Logs.findOne({ key });
    if (is_existed) {
      await Logs.findOneAndUpdate(
        { key: key },
        {
          $push: {
            LockLogs: { ID, type, timestamp, source, ip, local_ip, location },
          },
        }
      );
    } else {
      await Logs.create({
        key,
        LockLogs: { ID, type, timestamp, source, ip, local_ip, location },
      });
    }

    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "failed", e });
  }
};
