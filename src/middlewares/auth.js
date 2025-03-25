// middlewares/auth.js
const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redis');

module.exports = {
  verifyToken: async (req, res, next) => {
    try {
      // 1. Obtener token del header
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      

      // 2. Verificar si el token está revocado
      const isRevoked = await redisClient.exists(`token_blacklist:${token}`);
      if (isRevoked) {
        return res.status(401).json({ error: 'Token inválido. Sesión expirada' });
      }

      // 3. Verificar firma y expiración del token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Adjuntar información del usuario al request
      req.user = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email
      };

      // 5. Registrar acceso
      console.log(`Acceso autorizado: ${decoded.email} (${decoded.role})`);
      
      next();
    } catch (error) {
      // Manejar diferentes tipos de errores
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expirado. Inicie sesión nuevamente' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Token inválido. Acceso denegado' });
      }
      console.error('Error en verificación de token:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
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