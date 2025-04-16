import jwt from 'jsonwebtoken';
import { AdminModel } from '../../models/AmazonRDS/AdminModel.js';
import { AlumnoModel } from '../../models/AmazonRDS/AlumnoModel.js';
import { AsesorModel } from '../../models/AmazonRDS/AsesorModel.js';

export const generarToken = (usuario, tipoModelo) => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET no está definido');
    
    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: tipoModelo, // El rol se determina por el tipo de modelo
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
  
  /**
   * Verifica un token JWT y valida contra el modelo correspondiente
   * @param {String} token - Token a verificar
   * @returns {Object} Payload decodificado y validado
   */

  export const generarUserToken = (usuario, rol) => {
    return generarToken(usuario, rol);
};
  
  export const verificarToken = async (token) => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET no está definido');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let usuario;
    switch(decoded.modelo) {
      case 'estudiante':
        usuario = await AlumnoModel.getAlumnoByMail(decoded.email);
        break;
      case 'asesor':
        usuario = await AsesorModel.getAsesorByMail(decoded.email);
        break;
      case 'admin':
        usuario = await AdminModel.getAdminByMail(decoded.email);
        break;
      default:
        throw new Error('Tipo de usuario no válido');
    }
  
    if (!usuario || usuario.estado !== 'activo') { // Verifica estado del usuario
      throw new Error('Usuario no encontrado o inactivo');
    }
  
    return { decoded, usuario };
  }

// Middleware para verificar token en rutas protegidas
export const authMiddleware = (rolesPermitidos = []) => {
    return async (req, res, next) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
          return res.status(401).json({ error: 'Token no proporcionado' });
        }
  
        const { decoded, usuario } = await verificarToken(token);
  
        // Adjuntamos datos actualizados del usuario
        req.user = {
          ...usuario.dataValues,
          rol: usuario.rol
        };
  
        next();
      } catch (error) {
        let status = 401;
        let message = 'Error de autenticación';
        
        if (error.name === 'TokenExpiredError') {
          message = 'Token expirado';
        } else if (error.name === 'JsonWebTokenError') {
          message = 'Token inválido';
        } else if (error.message.includes('no encontrado')) {
          status = 404;
          message = error.message;
        } else if (error.message.includes('no válido')) {
          status = 403;
          message = error.message;
        }
        
        res.status(status).json({ 
          error: message,
          detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    };
  };