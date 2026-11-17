import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default async function checkAuth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") return res.sendStatus(401);
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const sub = payload.sub;
        const user = await User.findByPk(Number(sub));
        if (!user) return res.sendStatus(401);

        req.user = user;
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}