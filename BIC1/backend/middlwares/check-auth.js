const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = async function checkAuth(req, res, next) {
  const headers = req.headers;

  const authorizationHeader = headers.authorization ?? headers.Authorization;

  if (!authorizationHeader) {
    return res.sendStatus(401);
  }

  const [type, token] = authorizationHeader.split(/\s+/);

  if (type !== "Bearer") {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "MYStrongSecret"
    );
    const user = await User.findByPk(payload.user_id);

    if (!user) return res.sendStatus(401);

    req.user = user;
    next();
  } catch {
    return res.sendStatus(401);
  }
};
