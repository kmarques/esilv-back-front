const Label = require("../models/labels");

module.exports = {
  cget: async (req, res) => {
    res.json(await Label.findAll());
  },
  create: async (req, res, next) => {
    try {
      res.status(201).json(await Label.create(req.body));
    } catch (e) {
      next(e);
    }
  },
  get: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const label = await Label.findByPk(id);
    if (!label) {
      res.sendStatus(404);
    } else {
      res.json(label);
    }
  },
  patch: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [nbUpdated, [label]] = await Label.update(req.body, {
        where: { id },
        returning: true,
      });
      if (nbUpdated === 0) {
        return res.sendStatus(404);
      }

      return res.json(label);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const nbDeleted = await Label.destroy({ where: { id } });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  },
};
