const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.sendStatus(401);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.sendStatus(401);
    }

    return res.json({
      token: jwt.sign(
        {
          user_id: user.id,
        },
        process.env.JWT_SECRET ?? "MYStrongSecret"
      ),
    });
  },
};
