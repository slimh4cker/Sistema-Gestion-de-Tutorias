import { AsesorModel } from "../../models/AmazonRDS/AsesorModel.js";
import { generarUserToken } from '../../utils/jwt/jwt.js';
import { compararPassword } from '../../utils/security.js';

export const registrarAsesor = async (req, res) => {
  try {
    const { nombre, email, password, area_especializacion } = req.body;
    
    const nuevoAsesor = await AsesorModel.createAsesor({
      nombre,
      email,
      password,
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
    
    const user = await AsesorModel.getAsesorByMail(email);
    
    if (!user) {
      return res.status(404).json({
        error: "Asesor no encontrado"
      });
    }

    const passwordValida = compararPassword(password, user.password);
    
    if (!passwordValida) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      });
    }

    const token = generarUserToken(user, 'asesor')

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        area_especializacion: user.area_especializacion
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};