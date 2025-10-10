const Category = require("../models/category");

module.exports = {
  cget: async (req, res) => {
    res.json(await Category.findAll());
  },
  create: async (req, res, next) => {
    try {
      res.status(201).json(await Category.create(req.body));
    } catch (e) {
      next(e);
    }
  },
  get: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const category = await Category.findByPk(id);
    if (!category) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  },
  patch: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [nbUpdated, [category]] = await Category.update(req.body, {
        where: { id },
        returning: true,
        individualHooks: true,
      });
      if (nbUpdated === 0) {
        return res.sendStatus(404);
      }

      return res.json(category);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const nbDeleted = await Category.destroy({ where: { id } });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  },
};
