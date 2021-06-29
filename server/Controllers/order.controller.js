const Order = require("../Models/order.model");
const Lock = require("../Models/lock.model");
const PC = require("../Models/pcModel");
const { createEmergencyLockerOrder } = require("./emergency.contoller");
const { unSignKey } = require("../funcations/jwt.lib");
const Phone = require("../Models/phoneModel");
exports.createOrder = async (req, res) => {
  try {
    const { e_key, order, source } = req.body;
    const pc_info = await PC.findOne({ key: unSignKey(e_key).key });
    const phone_info = await Phone.findOne({ key: unSignKey(e_key).key });
    if (!pc_info) return res.sendStatus(404);
    let new_order = await Order.create({
      key: unSignKey(e_key).key,
      order,
      active: true,
      pc: pc_info._id,
      mobile: phone_info._id,
      source,
    });
    if (order === "RANSOM_LOCK") {
      const ransomResponse = await ransomHandler(
        unSignKey(e_key).key,
        pc_info._id,
        new_order._id
      );

      if (ransomResponse != {})
        return { order: ransomResponse.id, lock_id: ransomResponse.lock_id };

      return res.sendStatus(401);
    }
    return res.json({ new_order });
  } catch (error) {
    console.log(error);
    if (error) res.status(500).json({ status: "failed", error });
  }
};

exports.updateOrderLocation = async (req, res) => {
  try {
    const { e_key, order_id, location } = req.body;
    const pc_info = await PC.findOne({ key: unSignKey(e_key).key });
    if (!pc_info) return res.sendStatus(404);
    await Order.findOneAndUpdate(
      { _id: order_id },
      {
        source_location: location,
      }
    );

    return res.sendStatus(200);
  } catch (error) {
    if (error) res.status(500).json({ status: "failed", error });
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
    console.log(error);
    if (error) res.status(400).json({ status: "failed", error });
  }
};
const ransomHandler = async (key, pc_id, order_id) => {
  try {
    const is_already_locked = await Lock.findOne({
      key,
      locked: true,
    });
    if (!is_already_locked) {
      const new_locker = await createEmergencyLockerOrder(key, pc_id, order_id);
      return { id: order_id, lock_id: new_locker };
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};
