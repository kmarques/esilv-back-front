const users = [];

module.exports = {
  cget: (req, res, next) => {
    res.json(users);
  },
  post: (req, res, next) => {
    const data = {
      ...req.body,
      id: Date.now(),
    };
    users.push(data);
    res.json(data);
  },
  get: (req, res, next) => {
    const user = users.find((u) => u.id === req.params.id);
    res.json(user);
  },
};
