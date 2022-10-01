const { isAuth } = require("./authorization");

const authorize = (req, res, next) => {
  try {
    const userName = isAuth(req);
    if (!userName) throw new Error("Please log in again");
    next();
  } catch (error) {
    res.send({
      error: `${error.message}`,
    })
  }
}

module.exports = { authorize };