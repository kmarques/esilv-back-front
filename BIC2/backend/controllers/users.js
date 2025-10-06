const User = require("../models/users");

module.exports = {
  cget: async (req, res, next) => {
    res.json(await User.findAll());
  },
  create: async (req, res, next) => {
    try {
      res.status(201).json(await User.create(req.body));
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  },
  update: async (req, res, next) => {
    try {
      const [nbUdated, [updatedUser]] = await User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        individualHooks: true,
      });
      if (nbUdated === 0) {
        return res.sendStatus(404);
      }
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  // V2
  // update2: (req, res, next) => {
  //   const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  //   if (!user) {
  //     return res.sendStatus(404);
  //   }
  //   Object.assign(user, req.body);
  //   // V2.5
  //   // for (const key in req.body) {
  //   //   if (req.body[key] !== undefined) {
  //   //     user[key] = req.body[key];
  //   //   }
  //   // }
  //   res.json(user);
  // },
  delete: async (req, res, next) => {
    const nbDeleted = await User.destroy({ where: { id: req.params.id } });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  },
};
