const { verify } = require("jsonwebtoken");

const isAuth = (req) => {
  const authInfo = req.headers["authinfo"];
  try {
    if (!authInfo) throw new Error("Please log in");
    const token = authInfo;
    const {userId } = verify(token, process.env.SECRET_KEY);
    return userId;
  } catch (error) {
    return false;
  }
}

module.exports = { isAuth };