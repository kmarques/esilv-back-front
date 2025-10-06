const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = async (req, res, next) => {
  const header = req.headers["authorization"] ?? req.headers["Authorization"];

  if (header === undefined) {
    return res.sendStatus(401);
  }

  const [type, token] = header.split(/\s+/);
  if (type.toLowerCase() !== "bearer") {
    return res.sendStatus(401);
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(payload.user_id);
    next();
  } catch {
    return res.sendStatus(401);
  }
};
