const jwt = require("jsonwebtoken");
// const ipfilter = require('express-ipfilter').IpFilter

exports.security = (req, res, next) => {
  try {
    let t;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      hT = req.headers.authorization;
      t = hT.split(" ")[1];
    }

    if (!t) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(t, process.env.JWT_SECRET);

    req.user = decoded.username;

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

exports.GenerateNewToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET);
};
