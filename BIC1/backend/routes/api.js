import { Router } from "express";
import movieRouter from "./movies.js";
import userRouter from "./user.js";
import articleRouter from "./article.js";

const router = new Router();

router.use("/movies", movieRouter);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

export default router;