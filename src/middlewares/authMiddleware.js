  import jwt from 'jsonwebtoken';
import {
  modelo_cuenta_estudiante,
  modelo_cuenta_administrador,
  modelo_cuenta_asesor
} from "../models/AmazonRDS/Modelo_cuentas.js";

// Versión mejorada del middleware
export const verificarToken = async (req, res, next) => {
  try {
    // 1. Validación del header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Formato de autorización inválido' });
    }

    const token = authHeader.split(' ')[1];
    
    // 2. Verificación del token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Cache por ID de usuario
    const cacheKey = decoded.id;
    if (!req.app.locals.authCache) req.app.locals.authCache = new Map();
    
    let usuario = req.app.locals.authCache.get(cacheKey);
    
    if (!usuario) {
      // 4. Búsqueda directa por ID (usa tu modelo principal)
      usuario = await modelo_cuenta.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
        raw: true
      });

      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      
      // Almacenar en cache
      req.app.locals.authCache.set(cacheKey, usuario);
      setTimeout(() => {
        req.app.locals.authCache.delete(cacheKey);
      }, 300000);
    }

    // 5. Inyectar datos básicos del usuario
    req.auth = {
      ...usuario,
      tokenData: {
        id: decoded.id,
        iat: decoded.iat,
        exp: decoded.exp
      }
    };

    next();
  } catch (error) {
    // Manejo de errores
    const errorMapping = {
      'TokenExpiredError': { 
        code: 401, 
        message: 'Token expirado' 
      },
      'JsonWebTokenError': { 
        code: 401, 
        message: 'Token inválido' 
      },
      default: { 
        code: 500, 
        message: 'Error de autenticación' 
      }
    };
    
    const { code, message } = errorMapping[error.name] || errorMapping.default;
    res.status(code).json({ error: message });
  }
};