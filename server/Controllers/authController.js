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


// exports.OnlyMe = (req,res,next) =>{
//   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   ip = ip.replace(/^.*:/, '')

//   if (ip == "197.48.251.232"){
//     next()

//   }else{
//     res.json({ip})
//   }
// }

