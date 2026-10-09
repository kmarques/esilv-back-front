import { Router } from "express";
import User from "../models/user.js";

const router = new Router();

// CGET => collection GET => list resources
router.get('', async (req, res) => {
    // ?sort=year&page=3&itemsPerPage=10&lastname=toto&dob=2026-01-01
    const { page, itemsPerPage, sort, ...filters } = req.query;
    const othersParams = {};
    if (page) {
        othersParams.offset = (page - 1) * limit;
        othersParams.limit = itemsPerPage;
    }
    if (sort) {
        const direction = sort[0] === "-" ? 'DESC' : 'ASC';
        const key = sort[0] === "-" ? sort.slice(1) : sort;
        othersParams.order = [[key, direction]];
    }
    const users = await User.findAll({
        where: filters,
        ...othersParams
    });

    res.json(users);
});

// POST => collection => create a resource
router.post('', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.sendStatus(422);
        } else {
            console.error(error.message);
            res.sendStatus(500);
        }
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) return res.json(user);
    res.sendStatus(404);
});

router.patch('/:id', async (req, res) => {
    try {
        const [nbUpdated, [user]] = await User.update(req.body, {
            where: { id: req.params.id },
            returning: true,
            individualHooks: true
        });
        if (nbUpdated) return res.json(user);
        res.sendStatus(404);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.sendStatus(422);
        } else {
            console.error(error.message);
            res.sendStatus(500);
        }
    }
});

router.delete('/:id', async (req, res) => {
    const nbDeleted = await User.destroy({
        where: { id: req.params.id }
    });

    if (nbDeleted) return res.sendStatus(204);
    res.sendStatus(404);
});

export default router;