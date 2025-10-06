const { Router } = require("express");
const ArticleController = require("../controllers/articles");

const router = Router();

router.get("/articles", ArticleController.cget);
router.post("/articles", ArticleController.create);
router.get("/articles/:id", ArticleController.get);
router.patch("/articles/:id", ArticleController.update);
router.delete("/articles/:id", ArticleController.delete);

module.exports = router;
