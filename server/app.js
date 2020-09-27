const express = require("express");
const User = require("./Routes/userRoute");
const Control = require("./Routes/controlRoute");
const Config = require("./Routes/configRoute");

const app = express();


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

// 3) ROUTES
app.use("/api/users", User);
app.use("/api/control", Control);
app.use("/api/config", Config);


app.all("*", (req, res) => {
    res.status(404).send({
        status: "failed",
        err: "Unhandled Route. Error 404",
    });
});

module.exports = app;
