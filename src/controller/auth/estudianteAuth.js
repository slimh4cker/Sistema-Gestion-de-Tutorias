import { AlumnoModel } from "../../models/AmazonRDS/AlumnoModel.js";
import { generarUserToken } from '../../utils/jwt/jwt.js';
import { compararPassword } from '../../utils/security.js';
import { validarAlumnoZod } from "../../schemas/users/alumno.js";
import bcryptjs from "bcryptjs";

/**
 * 
 * Controlador para registrar un nuevo estudiante en el sistema.
 * Realiza validación de datos y crea un nuevo registro de alumno.
 * 
 * @function registrarEstudiante
 * @async
 * @param {Object} req - Objeto de solicitud de Express. Debe incluir `nombre`, `email`, `password` y `matricula` en el body.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} Retorna un objeto JSON con los datos del alumno registrado o un mensaje de error.
 */

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

/**
 * 
 * Controlador para el inicio de sesión de un estudiante.
 * Verifica las credenciales y genera un token JWT si son correctas.
 * 
 * @function loginEstudiante
 * @async
 * @param {Object} req - Objeto de solicitud de Express. Debe incluir `email` y `password` en el body.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} Retorna un objeto JSON con el token de autenticación y los datos del alumno, o un mensaje de error.
 */
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
    console.log(password)
    console.log(user.password)
    console.log(passwordValida)

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