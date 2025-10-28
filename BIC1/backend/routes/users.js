const { Router } = require("express");
const UserController = require("../controllers/users");
const checkAuth = require("../middlwares/check-auth");
const checkRole = require("../middlwares/check-role");
const router = Router();

router.get("/users", checkAuth, checkRole(["ADMIN"]), UserController.cget);

router.post("/users", checkAuth, checkRole(["ADMIN"]), UserController.create);

router.get(
  "/users/:id",
  checkAuth,
  checkRole(["ADMIN", "USER"]),
  UserController.get
);
router.patch(
  "/users/:id",
  checkAuth,
  checkRole(["ADMIN", "USER"]),
  UserController.patch
);
router.delete(
  "/users/:id",
  checkAuth,
  checkRole(["ADMIN", "USER"]),
  UserController.delete
);

module.exports = router;
