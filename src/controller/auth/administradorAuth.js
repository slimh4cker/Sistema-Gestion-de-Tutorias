import { AdminModel } from '../../models/AmazonRDS/AdminModel.js';
import { generarUserToken } from '../../utils/jwt/jwt.js';
import { compararPassword } from '../../utils/security.js';


// Registrar admin (solo accesible por otros admins)
export const registrarAdmin = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Validar que el solicitante es admin
    if (!req.user || req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const nuevoAdmin = await AdminModel.createAdmin({
      nombre,
      email,
      password,
      estado: 1
    });

    if (!nuevoAdmin) {
      return res.status(400).json({ error: "El admin ya existe" });
    }

    res.status(201).json({
      success: true,
      admin: {
        id: nuevoAdmin.id,
        nombre: nuevoAdmin.nombre,
        email: nuevoAdmin.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await AdminModel.getAdminByMail(email);
    
    if (!admin) {
      return res.status(404).json({ error: "Admin no registrado" });
    }

    const passwordValidated = compararPassword(password, admin.password);
    if (!passwordValidated) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = generarUserToken(admin, 'admin');

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        nombre: admin.nombre,
        email: admin.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};