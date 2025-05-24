import { AsesorModel } from "../../models/AmazonRDS/AsesorModel.js";
import { generarUserToken } from '../../utils/jwt/jwt.js';
import { compararPassword } from '../../utils/security.js';
import { validarAsesorZod } from "../../schemas/users/asesor.js";


/**
 * 
 * Controlador para registrar un nuevo asesor en el sistema.
 * Valida los datos proporcionados y registra al asesor con estado activo.
 * 
 * @function registrarAsesor
 * @async
 * @param {Object} req - Objeto de solicitud de Express. Debe contener en `body` los campos: nombre, email, password, area_especializacion.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} Retorna un objeto JSON con los datos del asesor registrado o un mensaje de error.
 */
export const registrarAsesor = async (req, res) => {
  try {
    const { nombre, email, password, area_especializacion } = req.body;

    // realizar validacion
    const validacion = validarAsesorZod(req.body);
    if (!validacion.success) {
      return res.status(400).json({
        error: "Datos del asesor no válidos",
        detalles: validacion.error.format()
      });
    }
    
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

/**
 * 
 * Controlador para el inicio de sesión de un asesor.
 * Verifica las credenciales y genera un token JWT si son válidas.
 * 
 * @function loginAsesor
 * @async
 * @param {Object} req - Objeto de solicitud de Express. Debe contener `email` y `password` en el body.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} Retorna un objeto JSON con el token de autenticación y los datos del asesor, o un mensaje de error.
 */
export const loginAsesor = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await AsesorModel.getAsesorByMail(email);
    
    if (!user) {
      return res.status(404).json({
        error: "Asesor no encontrado"
      });
    }

    const passwordValida = await compararPassword(password, user.password);
       
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