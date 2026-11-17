import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = new Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email }
    });

    if (!user) return res.sendStatus(401);

    if (!await bcrypt.compare(password, user.password)) return res.sendStatus(401);

    const token = jwt.sign({
        lastname: user.lastname,
        firstname: user.firstname
    }, process.env.JWT_SECRET, {
        subject: user.id.toString(),
        expiresIn: '1d'
    });

    res.json({
        token
    });
})


export default router;