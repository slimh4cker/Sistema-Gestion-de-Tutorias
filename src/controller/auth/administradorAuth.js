import { AdminModel } from "../../models/AmazonRDS/AdminModel.js";
import { generarToken } from "../src/utils/authUtils.js";

export const registrarAdministrador = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Verificar si el administrador ya existe
    const adminExistente = await AdminModel.getAdminByMail(email);
    if (adminExistente) {
      return res.status(400).json({ 
        error: "Ya existe un administrador registrado con este correo electrónico" 
      });
    }

    // Crear nuevo administrador
    const nuevoAdmin = await AdminModel.createAdmin({
      nombre,
      email,
      password, // Nota: La contraseña debería estar hasheada antes de llegar aquí
      estado: 1
    });

    if (!nuevoAdmin) {
      return res.status(400).json({ 
        error: "No se pudo registrar el administrador" 
      });
    }

    // Generar token JWT
    const token = generarToken({
      id: nuevoAdmin.id,
      email: nuevoAdmin.email,
      rol: 'administrador'
    });

    res.status(201).json({
      success: true,
      token,
      administrador: {
        id: nuevoAdmin.id,
        nombre: nuevoAdmin.nombre,
        email: nuevoAdmin.email
      }
    });

  } catch (error) {
    console.error("Error en registro de administrador:", error);
    res.status(500).json({ 
      error: "Error interno del servidor al registrar administrador" 
    });
  }
};

export const loginAdministrador = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar administrador por correo
    const admin = await AdminModel.getAdminByMail(email);
    if (!admin) {
      return res.status(401).json({ 
        error: "Credenciales inválidas o cuenta inactiva" 
      });
    }

    // Comparar contraseñas (debería usar bcrypt.compareSync)
    // Nota: Esto es un ejemplo, en producción usa bcrypt para comparar hashes
    if (admin.password !== password) {
      return res.status(401).json({ 
        error: "Credenciales inválidas" 
      });
    }

    // Generar token JWT
    const token = generarToken({
      id: admin.id,
      email: admin.email,
      rol: 'administrador'
    });

    res.json({
      success: true,
      token,
      administrador: {
        id: admin.id,
        nombre: admin.nombre,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Error en login de administrador:", error);
    res.status(500).json({ 
      error: "Error interno del servidor al iniciar sesión" 
    });
  }
};