import { AsesorModel } from "../../models/AmazonRDS/AsesorModel.js";
import { generarUserToken } from '../utils/jwt/jwt.js';
import { compararPassword, hashPassword } from '../utils/security.js';

export const registrarAsesor = async (req, res) => {
  try {
    const { nombre, email, password, area_especializacion } = req.body;
    
    // Hashear la contraseña antes de enviar al modelo
    const hashedPassword = hashPassword(password)
    
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
      asesor: {
        id: nuevoAsesor.id,
        nombre: nuevoAsesor.nombre,
        email: nuevoAsesor.email,
        area_especializacion: nuevoAsesor.area_especializacion
      }
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

    const passwordValida = compararPassword(password, asesor.password);
    
    if (!passwordValida) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      });
    }

    const token = generarUserToken(asesor, 'asesor')

    res.json({
      success: true,
      token,
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