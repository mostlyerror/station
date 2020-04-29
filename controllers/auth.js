const jwt = require('jsonwebtoken')

const accessTokenSecret = "youraccesstokensecret"
module.exports.accessTokenSecret = accessTokenSecret
const refreshTokenSecret = "yourrefreshtokensecret"
module.exports.refreshTokenSecret = refreshTokenSecret

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