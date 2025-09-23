const { Router } = require("express");

const router = Router();

const users = [];

router.get("/users", (req, res) => {
  res.json(users);
});

router.post("/users", (req, res) => {
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
});

// Routes PATCH & DELETE

module.exports = router;
