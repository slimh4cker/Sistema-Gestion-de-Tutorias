import { AlumnoModel } from "../models/AmazonRDS/AlumnoModel.js";
import { validarAlumno, validarParcialAlumno } from "../schemas/users/alumno.js";
import { obtenerMailDeReq } from "../utils/request.js";
import { hashPassword } from "../utils/security.js";

/**
 * Clase que encapsula los métodos para manejar las operaciones relacionadas con los alumnos.
*/

export class AlumnoControler {
  /**
   * Recupera los datos de un alumno utilizando su correo electrónico, obtenido desde el token.
   *
   * Pasos:
   * 1. Extrae el correo desde el token.
   * 2. Busca al alumno por su correo en la base de datos.
   * 3. Si no se encuentra, responde con error 404.
   * 4. Si hay error de autenticación, responde con 401.
   * 5. Si todo está bien, responde con los datos del alumno.
   *
   * @static
   * @async
   * @function getAlumnoByMail
   * @param {Request} req - Objeto de solicitud HTTP que contiene el token.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta con los datos del alumno o un mensaje de error.
   */
  static async getAlumnoByMail(req, res) {
   try {
      // obtener correo y datos
      const correo = obtenerMailDeReq(req);
      const datos = await AlumnoModel.getAlumnoByMail(correo);
      
      // ver si existen esos datos
      if (!datos) {
        return res.status(404).json({ error: "Alumno no encontrado" });
        }
        
        // enviar mensaje que es correcto
      res.status(200).json(datos);
     } catch (error) {
      // Manejo de errores
       if (error.message.includes("no autenticado")) {
         res.status(401).json({ error: "Autenticación requerida" });
       } else {
         console.error("Error en getAlumnoByMail:", error);
         res.status(500).json({ error: "Error interno del servidor" });
      }
     }
  }

  /**
   * Crea un nuevo alumno en la base de datos si su correo no está registrado.
   *
   * Pasos:
   * 1. Valida los datos del alumno usando Zod.
   * 2. Verifica que el correo no esté en uso por otro alumno.
   * 3. Si todo está correcto, crea el alumno en la base de datos.
   * 4. Devuelve una respuesta con estado 201 si fue exitoso.
   *
   * @static
   * @async
   * @function createAlumno
   * @param {Request} req - Objeto de solicitud HTTP que contiene los datos del alumno.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta indicando el resultado de la creación.
   */
  static async createAlumno(req, res) {
    // Recuperar datos
    const alumno = req.body

    // comprobar modelo con Zod
    if (!validarAlumno(alumno)) {
      res.status(400).json({ error: "datos del alumno no validos" })
      return
    }

    // buscar a otro alumno con el mismo correo
    let alumnoMail = false
    try {
      alumnoMail = await AlumnoModel.getAlumnoByMail(alumno.email)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el correo" })
      return  
    }
    
    // comprobar que no exista ya en la base de datos el correo
    if (alumnoMail != null) {
      res.status(400).json({ error: "Ya existe un alumno con ese correo" })
      return
    }

    // crear alumno
    try {
      await AlumnoModel.createAlumno(req.body)
    } catch (error) {
      res.status(500).json({ error: "Error interno al crear un alumno" })
      return
    }
    

    // retornar mensaje de que fue realizado correctamente
    res.status(201).json({ message: "Alumno creado correctamente" })
  }

  /**
   * Actualiza los datos de un alumno identificado por el correo en el token.
   * 
   * Pasos:
   * 1. Valida los datos del cuerpo de la petición usando validación parcial.
   * 2. Obtiene el correo del alumno desde el token.
   * 3. Si se incluye una contraseña, se encripta antes de guardar.
   * 4. Llama al modelo para actualizar al alumno.
   * 5. Retorna el resultado de la operación o errores si los hay.
   *
   * @static
   * @async
   * @function updateAlumno
   * @param {Request} req - Objeto de solicitud HTTP con los datos nuevos del alumno.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta con el estado de la operación.
   */
  static async updateAlumno(req, res) {
    try {
        // obtener y verificacion de alumnos
        const datos = req.body;
        if (!validarParcialAlumno(datos)) {
            return res.status(400).json({ error: "Datos en la petición incorrectos" });
        }

        const email = obtenerMailDeReq(req);
        if (!email) {
            return res.status(400).json({ error: "Correo no encontrado en el token" });
        }

        // Verificar si el alumno existe
        if (datos.password) {
            datos.password = await hashPassword(datos.password);
        }

        // Actualizar el alumno
        const resultado = await AlumnoModel.updateAlumno(email, datos);
        
        // Verificar si la actualización fue exitosa
        if (!resultado) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }

        // No enviar contrase;a porsupuesto
        delete resultado.password;

        // retornar mensaje
        res.status(200).json({
            message: "Datos actualizados correctamente",
            datos: resultado
        });

    } catch (error) {
        console.error("Error en updateAlumno:", error);
        res.status(500).json({ 
            error: "Error interno del servidor",
            detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
  }

  /**
   * Elimina un alumno de la base de datos usando su correo electrónico.
   *
   * Pasos:
   * 1. Obtiene el correo desde el token.
   * 2. Verifica que el alumno exista.
   * 3. Si existe, lo elimina de la base de datos.
   * 4. Retorna el estado de la operación al cliente.
   *
   * @static
   * @async
   * @function deleteAlumno
   * @param {Request} req - Objeto de solicitud HTTP con el token del alumno.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta indicando si se eliminó correctamente o no.
   */
  static async deleteAlumno(req, res) {
    // obtener correo
    const correo = obtenerMailDeReq(req)

    // asegurarse de que el alumno exista
    let emailAlumno = false
    try {
      emailAlumno = AlumnoModel.getAlumnoByMail(correo)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el alumno" })
    }

    if (!emailAlumno) {
      res.status(404).json({ error: "No se ha encontrado el alumno" })
      return
    }

    // borrar alumno
    try {
      await AlumnoModel.deleteAlumno(correo)
    } catch (error) {
      res.status(500).json({ error: "Error interno al borrar el alumno" })
      return
    }

    // enviar mensaje de que salio correctamente
    res.status(200).json({message: "El alumno ha sido borrado correctamente"})
  }
}