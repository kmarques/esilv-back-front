const { Router } = require("express");
const UserController = require("../controllers/users");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");

const router = Router();

router.get(
  "/users",
  checkAuth,
  checkRole({ role: "ADMIN" }),
  UserController.cget
);
router.post("/users", checkRole({ role: "ADMIN" }), UserController.create);
router.get(
  "/users/:id",
  checkAuth,
  checkRole({ role: "ADMIN", selfAccess: true }),
  UserController.get
);
router.patch(
  "/users/:id",
  checkAuth,
  checkRole({ role: "ADMIN", selfAccess: true }),
  UserController.update
);
router.delete(
  "/users/:id",
  checkAuth,
  checkRole({ role: "ADMIN", selfAccess: true }),
  UserController.delete
);

module.exports = router;
