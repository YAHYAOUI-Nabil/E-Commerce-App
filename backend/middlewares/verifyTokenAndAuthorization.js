const verifyToken = require('./verifyToken')

module.exports = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.userId === req.params.id || req.userIsAdmin) {
        next()
      } else {
        res.status(403).json("You are not alowed to do that!")
      }
    });
  };