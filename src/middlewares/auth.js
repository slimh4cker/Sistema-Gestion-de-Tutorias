// middlewares/auth.js
const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redis');

module.exports = {
  verifyToken: async (req, res, next) => {
    // ... implementación anterior
  },

  requireRole: (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({
          error: `Acceso denegado. Se requiere rol de ${role}`
        });
      }
      next();
    };
  }
};