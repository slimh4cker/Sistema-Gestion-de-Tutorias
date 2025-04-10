// Corrige las importaciones
import { AsesorModel } from "../../models/AmazonRDS/AsesorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Función para generar token (debes implementarla)
const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rol: "asesor" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Función para comparar contraseñas
const compararPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const registrarAsesor = async (req, res) => {
  try {
    const { nombre, email, password, area_especializacion } = req.body;
    
    // Hashear la contraseña antes de enviar al modelo
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const nuevoAsesor = await AsesorModel.createAsesor({
      nombre,
      email,
      password: hashedPassword,
      area_especializacion,
      estado: 1 // Asegura el estado activo
    });

    if (!nuevoAsesor) {
      return res.status(400).json({
        error: "El correo ya está registrado"
      });
    }

    res.status(201).json({
      success: true,
      token: generarToken(nuevoAsesor),
      asesor: nuevoAsesor
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const loginAsesor = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const asesor = await AsesorModel.getAsesorByMail(email);
    
    if (!asesor) {
      return res.status(404).json({
        error: "Asesor no encontrado"
      });
    }

    const passwordValida = await compararPassword(password, asesor.password);
    
    if (!passwordValida) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      });
    }

    res.json({
      success: true,
      token: generarToken(asesor),
      asesor: {
        id: asesor.id,
        nombre: asesor.nombre,
        email: asesor.email,
        area_especializacion: asesor.area_especializacion
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};