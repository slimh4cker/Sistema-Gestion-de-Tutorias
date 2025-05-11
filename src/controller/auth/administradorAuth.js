import { AdminModel } from '../../models/AmazonRDS/AdminModel.js';
import { generarUserToken } from '../../utils/jwt/jwt.js';
import { compararPassword } from '../../utils/security.js';
import { validarAdminZod } from '../../schemas/users/admin.js';

// Registrar admin (solo accesible por otros admins)
export const registrarAdmin = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validar que el solicitante es admin
    if (!req.user || req.user.rol !== 'administrador') {
      return res.status(403).json({ error: 'No autorizado' });
    }

    // Validar datos del administrador
    const validacion = validarAdminZod(req.body);
    if (!validacion.success) {
      return res.status(400).json({
        error: "Datos del administrador no válidos",
        detalles: validacion.error.format()
      });
    }

    const nuevoAdmin = await AdminModel.createAdmin({
      nombre,
      email,
      password,
      estado: 1
    });

    if (!nuevoAdmin) {
      return res.status(409).json({ error: "Ya existe un administrador activo con ese correo." });
    }

    return res.status(201).json({
      success: true,
      admin: {
        id: nuevoAdmin.id,
        nombre: nuevoAdmin.nombre,
        email: nuevoAdmin.email
      }
    });

  } catch (error) {
    console.error("Error al registrar admin:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await AdminModel.getAdminByMail(email);
    
    if (!user) {
      return res.status(404).json({ error: "Admin no registrado" });
    }

    const passwordValidated = compararPassword(password, user.password);
    if (!passwordValidated) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = generarUserToken(user, 'administrador');

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};