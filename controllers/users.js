const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { auth, accessTokenSecret, refreshTokenSecret } = require("./auth");

const users = [
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
  {
    username: "ben",
    email: "ben@ben.com",
    password: "benpassword",
    role: "admin",
  },
  {
    username: 'asdf',
    email: 'asdf@asdf.com',
    password: 'asdf',
    role: 'admin',
  }
];

let refreshTokens = [];

router.post("/register", (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body.user;

  users.push({
    username,
    email,
    password,
    role: 'member'
  })

  console.log(users)
  res.sendStatus(201);
});

// issue access and refresh tokens
router.post("/login", (req, res) => {
  const { userIdentifier, password } = req.body.user;

  const user = users.find((u) => {
    return (
      (u.username === userIdentifier || u.email === userIdentifier) && u.password === password
    );
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, email: user.email, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      { username: user.username, email: user.email, role: user.role },
      refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
    });
  } else {
    res.statusMessage = 'Username or password incorrect'
    res.status(400).send()
  }
});

// refresh a token
router.post("/token", auth, (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});

// revoke an existing refresh token
router.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.send("Logout successful");
});

module.exports = router;
