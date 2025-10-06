const { Router } = require("express");
const UserController = require("../controllers/users");

const router = new Router();

router.post("/register", UserController.create);

module.exports = router;
