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
  patch: (req, res, next) => {
    const dataUser = req.body;
    const id = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.sendStatus(404);
    }
    if (dataUser.login && dataUser.login !== "") {
      errors.login = "Value is required";
    }
    if (dataUser.email) {
      if (dataUser.email !== "") {
        errors.email = "Value is required";
      } else if (!/[a-z]+@[a-z]+\.[a-z]+/.test(dataUser.email)) {
        errors.email = "Not a valid email";
      }
    }
    if (dataUser.password && dataUser.password !== "") {
      errors.password = "Value is required";
    }
    if (Object.keys(errors).length) {
      return res.status(422).json(errors);
    }
    Object.assign(user, dataUser);
    return res.json(user);
  },
  patch2: (req, res, next) => {
    const dataUser = req.body;
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return res.sendStatus(404);
    }
    if (dataUser.login && dataUser.login !== "") {
      errors.login = "Value is required";
    }
    if (dataUser.email) {
      if (dataUser.email !== "") {
        errors.email = "Value is required";
      } else if (!/[a-z]+@[a-z]+\.[a-z]+/.test(dataUser.email)) {
        errors.email = "Not a valid email";
      }
    }
    if (dataUser.password && dataUser.password !== "") {
      errors.password = "Value is required";
    }
    if (Object.keys(errors).length) {
      return res.status(422).json(errors);
    }
    const updatedUser = { ...users[userIndex], ...dataUser };
    //const updatedUser = Object.assign({}, users[userIndex], dataUser);
    users[userIndex] = updatedUser;
    // users.splice(userIndex, 1, updatedUser);

    // for (const key in dataUser) {
    //   users[userIndex][key] = dataUser[key];
    // }
    return res.json(updatedUser);
  },
  delete: (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return res.sendStatus(404);
    }
    users.splice(userIndex, 1);
    return res.sendStatus(204);
  },
};
