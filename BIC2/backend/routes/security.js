import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = new Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: { username }
    });

    if (!user) return res.sendStatus(401);

    if (!(await bcrypt.compare(password, user.password))) return res.sendStatus(401);

    const token = jwt.sign({
        username: user.username,
        userId: user.id
    }, process.env.JWT_SECRET, {
        subject: user.id
    });

    res.json({
        token
    });
});

export default router;