const express = require("express");
const User = require("./Routes/user.routes");
const Orders = require("./Routes/order.routes");
const Config = require("./Routes/configRoute");
const Emergency = require("./Routes/emergency.routes");
const Reports = require("./Routes/reports.routes");
const Key = require("./Routes/keys.routes");
const { getConnectionSchema, getSKey } = require("./funcations/socket.handler");

const app = express();
var server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// 1) MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
var ACTIVE_USERS = [];

io.on("connection", (socket) => {
  // Send Schema to Middleware to check key

  console.log(
    getConnectionSchema(
      socket.id,
      socket.handshake.query.key,
      socket.handshake.query.source
    )
  );
  ACTIVE_USERS.push({
    key: socket.handshake.query.key,
    socket_id: socket.id,
    source: socket.handshake.query.source,
  });

  socket.on("turn_on", (room) => {
    console.log(ACTIVE_USERS);
    io.emit("turn_on", { room });
  });

  socket.on("isActive", ({ key }) => {
    for (var i = 0; i < ACTIVE_USERS.length; i++) {
      if (ACTIVE_USERS[i].key == key && ACTIVE_USERS[i].source == "desktop") {
        io.emit("emitIsActive", {
          isActive: true,
          id: socket.id,
          key: key,
          source: "desktop",
        });
        console.log("FOUND");
        break;
      }
    }

    console.log(`isActive:${ACTIVE_USERS.length}`);
    console.log(ACTIVE_USERS);
  });

  socket.on("order", ({ room, order, orderid, source }) => {
    console.log(room, order, orderid, source);
    io.volatile.emit("order", { order, orderid, source });
  });
  socket.on("disconnect", (reason) => {
    ACTIVE_USERS = ACTIVE_USERS.filter((e) => {
      return e.socket_id != socket.id;
    });
    io.emit("emitIsActive", {
      isActive: false,
      source: socket.handshake.query.source,
      id: socket.id,
      key: socket.handshake.query.key,
    });

    console.log(`disconnect: ${reason}`);
    console.log(ACTIVE_USERS);
  });
  socket.on("SCREENSHOT_REPLAY", ({ room, data, order_id, order }) => {
    let base64String = data.toString("base64");

    io.emit("SCREENSHOT_IMAGE", {
      room,
      data: base64String,
      order_id,
      order,
    });
  });
  socket.on("CAMERA_REPLAY", ({ room, data, order_id, order }) => {
    let base64String = data.toString("base64");

    io.emit("CAMERA_IMAGE", { room, data: base64String, order_id, order });
  });
  socket.on("LOCKER_REPLAY", ({ room, data, order_id, order }) => {
    io.emit("DESKTOP_LOCKED", { room, data, order_id, order });
  });
  socket.on("DESKTOP_UNLOCKED", ({ room, data, order_id, order }) => {
    io.emit("DESKTOP_UNLOCKED", { room, data, order_id, order });
  });

  socket.on("MUTE_PC", ({ room, data, order_id, order }) => {
    io.volatile.emit("MUTE_REPLAY", { room, data, order_id, order });
  });

  socket.on("SHUTDOWN_THE_SKY", ({ room, data, order_id, order }) => {
    io.volatile.emit("SHUTDOWN_REPLAY", { room, data, order_id, order });
  });

  socket.on("RESTART_THE_SKY", ({ room, data, order_id, order }) => {
    io.volatile.emit("RESTART_REPLAY", { room, data, order_id, order });
  });

  socket.on("MEDIA", ({ room, data, order_id, order }) => {
    io.volatile.emit(order_id);
  });

  socket.on("MEDIA_REPLAY", ({ room, replay }) => {
    io.volatile.emit(replay);
  });

  socket.on("RECORD_BUFFER", ({ room, data }) => {
    io.volatile.emit("RECORD_BUFFER", { data });
  });

  socket.on("STOP_LISTEN", ({ key }) => {
    io.emit("STOP_LISTEN", { key });
  });

  socket.on("UPDATED_INFO", ({ room }) => {
    io.volatile.emit("UPDATED_INFO", { room });
  });
});
// 3) ROUTES
app.use("/api/users", User);
app.use("/api/order", Orders);
app.use("/api/emergency", Emergency);
app.use("/api/reports", Reports);
app.use("/api/keys", Key);
app.use("/api/config", Config);
app.all("*", (req, res) => {
  res.status(404).send({
    status: "failed",
  });
});

module.exports = server;
