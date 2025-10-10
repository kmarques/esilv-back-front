const { Router } = require("express");
const LabelController = require("../controllers/labels");
const router = Router();

router.get("/labels", LabelController.cget);

router.post("/labels", LabelController.create);

router.get("/labels/:id", LabelController.get);
router.patch("/labels/:id", LabelController.patch);
router.delete("/labels/:id", LabelController.delete);

module.exports = router;
