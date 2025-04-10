  import jwt from 'jsonwebtoken';
import {
  modelo_cuenta_estudiante,
  modelo_cuenta_administrador,
  modelo_cuenta_asesor
} from "../models/AmazonRDS/Modelo_cuentas.js";

// Versión mejorada del middleware
export const verificarToken = async (req, res, next) => {
  try {
    // 1. Mejor manejo del header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Formato de autorización inválido' });
    }

    const token = authHeader.split(' ')[1];
    
    // 2. Verificación con manejo de errores específicos
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Cache de 5 minutos para reducir consultas a DB
    const cacheKey = `${decoded.role}_${decoded.id}`;
    if (!req.app.locals.authCache) req.app.locals.authCache = new Map();
    
    let usuario = req.app.locals.authCache.get(cacheKey);
    
    if (!usuario) {
      // 4. Model mapping dinámico
      const models = {
        estudiante: modelo_cuenta_estudiante,
        asesor: modelo_cuenta_asesor,
        administrador: modelo_cuenta_administrador
      };
      
      const model = models[decoded.role];
      if (!model) return res.status(403).json({ error: 'Rol no válido' });

      usuario = await model.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }, // Excluir datos sensibles
        raw: true
      });

      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      
      // Almacenar en cache
      req.app.locals.authCache.set(cacheKey, usuario);
      setTimeout(() => {
        req.app.locals.authCache.delete(cacheKey);
      }, 300000); // 5 minutos
    }

    // 5. Inyectar datos esenciales en el request
    req.auth = {
      ...usuario,
      tokenData: {
        id: decoded.id,
        role: decoded.role,
        iat: decoded.iat,
        exp: decoded.exp
      }
    };

    next();
  } catch (error) {
    // 6. Manejo detallado de errores JWT
    const errorMapping = {
      'TokenExpiredError': { 
        code: 401, 
        message: 'Token expirado, por favor renueva tu sesión' 
      },
      'JsonWebTokenError': { 
        code: 401, 
        message: 'Token inválido o mal formado' 
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

// Versión mejorada del control de roles
export const requiereRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    // 1. Verificar existencia de auth previamente
    if (!req.auth) {
      return res.status(401).json({ error: 'Autenticación no verificada' });
    }
    
    // 2. Soporte para múltiples roles y jerarquías
    const tieneAcceso = rolesPermitidos.some(rol => {
      if (typeof rol === 'string') return rol === req.auth.tokenData.role;
      if (Array.isArray(rol)) return rol.includes(req.auth.tokenData.role);
      return false;
    });

    if (!tieneAcceso) {
      // 3. Logging de seguridad
      console.warn(`Intento de acceso no autorizado: 
        Usuario: ${req.auth.email} - 
        Rol: ${req.auth.tokenData.role} - 
        Ruta: ${req.originalUrl}`);
      
      return res.status(403).json({ 
        error: `Acceso restringido. Se requiere uno de estos roles: ${rolesPermitidos.join(', ')}` 
      });
    }

    next();
  };
};