const jwt = require('jsonwebtoken')

module.exports.users = [
  {
    username: "john",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "anna",
    password: "password123member",
    role: "member",
  },
];

module.exports.accessTokenSecret = "youraccesstokensecret";
module.exports.refreshTokenSecret = "yourrefreshtokensecret";
module.exports.refreshTokens = [];

module.exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      return next();
    });
  } else {
    res.sendStatus(401);
  }
};