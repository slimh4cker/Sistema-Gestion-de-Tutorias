import { AlumnoModel } from "../../models/AmazonRDS/AlumnoModel.js";
import { generarUserToken } from '../../utils/jwt/jwt.js';
import { compararPassword } from '../../utils/security.js';
import { validarAlumnoZod } from "../../schemas/users/alumno.js";
import bcryptjs from "bcryptjs";

export const registrarEstudiante = async (req, res) => {
  try {
    const { nombre, email, password, matricula } = req.body;
    
    // realizar validaciones
    const validacion = validarAlumnoZod(req.body);
    if (!validacion.success) {
      return res.status(400).json({
        error: "Datos del alumno no válidos",
        detalles: validacion.error.format()
      });
    }


    const nuevoEstudiante = await AlumnoModel.createAlumno({
      nombre,
      email,
      password,
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

    const user = await AlumnoModel.getAlumnoByMail(email);
    //console.log("Contraseña recibida:", password);
    //console.log("Hash almacenado:", alumno?.password);
    const hash = await bcryptjs.hash(password, 10);
    console.log("Hash generado:", hash);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const passwordValida = await compararPassword(password, user.password); 

    if (!passwordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = generarUserToken(user, 'alumno');

    res.json({
      success: true,
      token,
      user: {
        id: user.id,          
        nombre: user.nombre,  
        email: user.email,    
        matricula: user.matricula
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};