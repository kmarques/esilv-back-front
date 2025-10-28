module.exports = function ({ role, selfAccess = false } = {}) {
  return async (req, res, next) => {
    if (selfAccess && req.user.id === req.params.id) {
      return next();
    }

    if (role !== req.user.role) {
      return res.sendStatus(403);
    }

    next();
  };
};
