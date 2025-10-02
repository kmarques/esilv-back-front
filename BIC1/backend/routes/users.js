const { Router } = require("express");
const UserController = require("../controllers/users");
const router = Router();

router.get("/users", UserController.cget);

router.post("/users", UserController.create);

router.get("/users/:id", UserController.get);

// Routes PATCH & DELETE

module.exports = router;
