const { Router } = require("express");
const CategoryController = require("../controllers/categories");
const checkAuth = require("../middlwares/check-auth");
const router = Router();

router.get("/categories", checkAuth, CategoryController.cget);

router.post("/categories", checkAuth, CategoryController.create);

router.get("/categories/:id", checkAuth, CategoryController.get);
router.patch("/categories/:id", checkAuth, CategoryController.patch);
router.delete("/categories/:id", checkAuth, CategoryController.delete);

module.exports = router;
