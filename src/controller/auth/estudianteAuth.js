import { AlumnoModel } from "../../models/AmazonRDS/AlumnoModel.js";
import { generarUserToken } from '../../utils/jwt/jwt.js';
import { compararPassword, hashPassword } from '../../utils/security.js';

export const registrarEstudiante = async (req, res) => {
  try {
    const { nombre, email, password, matricula } = req.body;

    const hashedPassword = hashPassword(password)
    
    const nuevoEstudiante = await AlumnoModel.createAlumno({
      nombre,
      email,
      hashedPassword,
      matricula
    });

    if (!nuevoEstudiante) {
      return res.status(400).json({
        error: "El correo ya está registrado"
      });
    }

    res.status(201).json({
      success: true,
      alumno: {
        id: nuevoEstudiante.id,
        nombre: nuevoEstudiante.nombre,
        email: nuevoEstudiante.email,
        matricula: nuevoEstudiante.matricula
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const loginEstudiante = async (req, res) => {
  try {
    const { email, password } = req.body;

    const alumno = await AlumnoModel.getAlumnoByMail(email);

    if (!alumno) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const passwordValida = await compararPassword(password, alumno.password); 

    if (!passwordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = generarUserToken(alumno, 'alumno');

    res.json({
      success: true,
      token,
      estudiante: {
        id: alumno.id,          
        nombre: alumno.nombre,  
        email: alumno.email,    
        matricula: alumno.matricula
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};