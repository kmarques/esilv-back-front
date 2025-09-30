const users = [];

module.exports = {
  cget: (req, res, next) => {
    res.json(users);
  },
  create: (req, res, next) => {
    const data = {
      ...req.body,
      id: Date.now(),
    };
    users.push(data);
    res.json(data);
  },
  get: (req, res, next) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  },
};
