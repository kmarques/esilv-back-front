const users = [];

module.exports = {
  cget: (req, res) => {
    res.json(users);
  },
  create: (req, res) => {
    const dataUser = req.body;
    const errors = {};
    if (!dataUser.login) {
      errors.login = "Value is required";
    }
    if (!dataUser.email) {
      errors.email = "Value is required";
    } else if (!/[a-z]+@[a-z]+\.[a-z]+/.test(dataUser.email)) {
      errors.email = "Not a valid email";
    }
    if (!dataUser.password) {
      errors.password = "Value is required";
    }
    if (Object.keys(errors).length) {
      res.status(422).json(errors);
    } else {
      const newUser = {
        ...dataUser,
        id: Date.now(),
      };
      users.push(newUser);
      res.status(201).json(newUser);
    }
  },
  get: (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === id);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  },
};
