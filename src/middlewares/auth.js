import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import { modelo_cuenta_estudiante, modelo_cuenta_administrador, modelo_cuenta_asesor } from "../models/AmazonRDS/Modelo_cuentas.js"
=======
import { modelo_cuenta_estudiante, modelo_cuenta_administrador, modelo_cuenta_asesor } from "../models/AmazonRDS/Modelo_cuentas.js";
>>>>>>> 6222131a63d6eec85603b457ba07120a71806e2b

// Middleware para verificar el token
export const verificarToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header 'Authorization'
  if (!token) return res.status(401).json({ error: 'Acceso denegado, no se proporcionó un token' });

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let usuario;

    // Consulta del usuario según el rol
    switch (decoded.role) {
      case 'estudiante':
        usuario = await modelo_cuenta_estudiante.findByPk(decoded.id);
        break;
      case 'asesor':
        usuario = await modelo_cuenta_asesor.findByPk(decoded.id);
        break;
      case 'administrador':
        usuario = await modelo_cuenta_administrador.findByPk(decoded.id);
        break;
      default:
        return res.status(403).json({ error: 'Rol no válido' }); // Si el rol no es válido, denegamos el acceso
    }

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Asignamos el usuario decodificado a la solicitud (req.usuario)
    req.usuario = usuario;
    next(); // Continuamos con la ejecución del siguiente middleware o ruta
  } catch (error) {
    // Manejo de errores: si el token es inválido
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
};

// Middleware para requerir roles específicos
export const requiereRol = (...rolesPermitidos) => (req, res, next) => {
  if (!rolesPermitidos.includes(req.usuario.role)) {
    return res.status(403).json({ error: 'Acceso no autorizado, rol insuficiente' });
  }
  next(); // Si el rol está permitido, continuamos con la ejecución
};
