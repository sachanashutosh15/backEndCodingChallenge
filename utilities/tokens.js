const jwt = require("jsonwebtoken");

function createAccessToken(userId) {
  return jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  })
}

function sendAccessToken(req, res, accessToken) {
  res.send({
    result: "Logged in successfully",
    accessToken,
    userName: req.body.userName,
  })
}

module.exports = {
  createAccessToken,
  sendAccessToken
}