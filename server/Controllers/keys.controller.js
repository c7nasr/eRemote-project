const { signKey, unSignKey } = require("../funcations/jwt.lib");
const Users = require("../Models/userModel");
const generate_key = () => {
  return "nxxx-xxxx-xxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
exports.getKey = async (req, res) => {
  try {
    const new_key = generate_key();
    await Users.create({ key: new_key });
    const signedKey = signKey(new_key);
    res.status(200).json({
      status: "ok",
      token: signedKey,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error });
  }
};
exports.connect_pc = async (req, res) => {
  try {
    const key = req.body.key;
    const findKey = await Users.findOne({ key });
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

    const match = await Users.findOneAndUpdate(
      { key },
      { matched: true },
      { new: true }
    );
    return res.status(200).json(match);
  } catch (error) {
    console.log(error);
    if (error) res.status(200).json({ status: "failed", error });
  }
};

exports.connect_phone = async (req, res) => {
  try {
    const token = req.headers.token;
    const anti_spam_token = req.headers.as;

    if (!token) return res.sendStatus(401);
    const is_valid = unSignKey(token);
    if (!is_valid) return res.sendStatus(401);

    if (token && is_valid) {
      // Check in DB
      const is_matched = await Users.findOne({ key: is_valid.key });
      if (is_matched.matched) return res.json({ status: "ok", matched: true });
      return res.json({ status: "ok", matched: false, key: is_valid.key });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

exports.delete = async (req, res) => {
  try {
    let t = 60;

    for (let index = 0; index < t; index++) {
      await Users.findOneAndDelete({ matched: false });
    }

    return res.sendStatus(200);
  } catch (error) {
    if (error) res.status(500).json({ status: "failed", error });
  }
};
