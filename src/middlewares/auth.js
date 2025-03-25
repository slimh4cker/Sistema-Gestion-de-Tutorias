import jwt from 'jsonwebtoken';
import { modelo_cuenta_estudiante, modelo_cuenta_administrador, modelo_cuenta_asesor } from "../src/models/AmazonRDS/Modelo_cuentas.js";

export const verificarToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let usuario;

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
        return res.status(403).json({ error: 'Rol no válido' });
    }

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

export const requiereRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }
    next();
  };
};