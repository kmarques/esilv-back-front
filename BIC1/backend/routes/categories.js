const { Router } = require("express");
const CategoryController = require("../controllers/categories");
const router = Router();

router.get("/categories", CategoryController.cget);

router.post("/categories", CategoryController.create);

router.get("/categories/:id", CategoryController.get);
router.patch("/categories/:id", CategoryController.patch);
router.delete("/categories/:id", CategoryController.delete);

module.exports = router;
