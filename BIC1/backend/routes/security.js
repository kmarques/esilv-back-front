const { Router } = require("express");
const UserController = require("../controllers/users");
const SecurityController = require("../controllers/security");
const router = Router();

router.post(
  "/register",
  /* validateInput(User, (req) => {delete req.body.role}),*/
  UserController.create
);
router.post("/login", SecurityController.login);

module.exports = router;
