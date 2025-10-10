const { Router } = require("express");
const UserController = require("../controllers/users");
const SecurityController = require("../controllers/security");
const router = Router();

router.post("/register", UserController.create);
router.post("/login", SecurityController.login);

module.exports = router;
