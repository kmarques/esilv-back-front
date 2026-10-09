import { Router } from "express";
import User from "../models/user.js";

const router = new Router();

// CGET => collection get => listing
router.get('', async (req, res) => {
    const { page, itemsPerPage, sort, ...filters } = req.query;
    const otherParams = {};

    if (page) {
        otherParams.offset = (page - 1) * itemsPerPage;
        otherParams.limit = itemsPerPage;
    }

    if (sort) {
        const direction = sort.startsWith("-") ? "DESC" : "ASC";
        const key = sort.startsWith("-") ? sort.slice(1) : sort;
        otherParams.order = [[key, direction]];
    }

    const users = await User.findAll({
        where: filters,
        ...otherParams
    });

    res.json(users);
});

// POST => collection create
router.post('', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.status(422).json({
                // à remplir
                // invalidKey : [ "message 1", "message 2"]
            });
        } else {
            console.error(error);
            res.sendStatus(500);
        }
    }
});

// GET => get item
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) return res.sendStatus(404);
    res.json(user);
});

// PATCH => patch item => partial update
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [, [user]] = await User.update(req.body, {
            where: { id },
            returning: true
        });

        if (!user) return res.sendStatus(404);
        res.json(user);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.status(422).json({
                // à remplir
                // invalidKey : [ "message 1", "message 2"]
            });
        } else {
            console.error(error);
            res.sendStatus(500);
        }
    }
});

// DELETE => delete item
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const nbDeleted = await User.destroy({
        where: { id }
    });

    if (!nbDeleted) return res.sendStatus(404);
    res.sendStatus(204);
});

export default router;