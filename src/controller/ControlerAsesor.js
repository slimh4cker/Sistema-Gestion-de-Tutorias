 import { AsesorModel } from "../models/AmazonRDS/AsesorModel.js";
import { validarAsesor, validarParcialAsesor } from "../schemas/users/asesor.js";
import { obtenerMailDeReq } from "../utils/request.js";

/**
 * Clase que encapsula los metodos relacionados a los asesores.
 */
export class AsesorControler {
  /**
   * Obtiene los datos de un asesor según su correo electrónico.
   *
   * Flujo:
   * 1. Extrae el correo del token presente en la solicitud.
   * 2. Verifica que el correo esté disponible.
   * 3. Consulta a la base de datos para obtener los datos del asesor.
   * 4. Devuelve los datos encontrados o un error si no existe o hay una falla.
   *
   * @static
   * @async
   * @function getAsesorByMail
   * @param {Request} req - Objeto de solicitud HTTP. Se espera que el correo esté en el token.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Devuelve los datos del asesor o un mensaje de error.
   */
  static async getAsesorByMail(req, res) {
    // Recuperar correo
    const correo = obtenerMailDeReq(req)
    if (!correo) {
      res.status(400).json({ error: "No se cuenta con el correo en la request" })
      return
    }

    // Buscar en la base de datos los datos de el asesor segun este correo
    let datos = null
    try {
      datos = await AsesorModel.getAsesorByMail(correo)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el asesor" })
    }
  
    if (!datos) {
      res.status(404).json({ error: "No se ha encontrado el asesor" })
      return
    }

    // Retornar datos
    res.status(200).json(datos)
  }

  /**
   * Crea un nuevo asesor en la base de datos.
   *
   * Flujo:
   * 1. Recupera los datos del asesor desde el cuerpo de la petición.
   * 2. Valida el esquema usando Zod.
   * 3. Verifica que no exista un asesor con el mismo correo.
   * 4. Inserta el asesor en la base de datos.
   * 5. Devuelve una respuesta HTTP con el estado correspondiente.
   *
   * @static
   * @async
   * @function createAsesor
   * @param {Request} req - Objeto de solicitud HTTP, debe contener los datos del asesor en `req.body`.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta HTTP con mensaje de éxito o error.
   */
  static async createAsesor(req, res) {
    // Recuperar datos
    const asesor = req.body

    // validar mediante validacion basica
    if (!validarAsesor(asesor)) {
      res.status(400).json({ error: "alguno o varios de los campos del asesor son incorrectos" })
      return
    }

    // comprobar que no exista ya en la base de datos el correo
    let AsesorMail = null
    try {
      AsesorMail = await AsesorModel.getAsesorByMail(asesor.email)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el correo" })
      return  
    }

    if (AsesorMail != null) {
      res.status(400).json({ error: "Ya existe un asesor con ese correo" })
      return
    }

    // crear el asesor en la base de datos
    try{
      await AsesorModel.createAsesor(asesor)
    } catch {
      res.status(500).json({ error: "Error interno al crear un asesor" })
      return
    }

    // retornar mensaje de que fue realizado correctamente
    res.status(201).json({ message: "Asesor creado correctamente" })

  }

  /**
   * Actualiza los datos de un asesor existente usando su correo como identificador.
   *
   * Flujo:
   * 1. Obtiene el correo actual desde el token.
   * 2. Valida los nuevos datos (parciales).
   * 3. Si se cambia el correo, se asegura de que el nuevo no esté en uso.
   * 4. Realiza la actualización en la base de datos.
   * 5. Devuelve un mensaje de éxito o error.
   *
   * @static
   * @async
   * @function updateAsesor
   * @param {Request} req - Objeto de solicitud HTTP, contiene los nuevos datos del asesor en `req.body`.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta con estado de la operación.
   */
  static async updateAsesor(req, res) {
    const email = obtenerMailDeReq(req);
    const datos = req.body;
  
    // Validar los datos
    if (!validarParcialAsesor(datos)) {
      return res.status(400).json({ error: "Datos incorrectos del asesor" });
    }
  
    // Verificar si el nuevo correo ya está en uso
    if (datos.email) {
      try {
        const asesorExistente = await AsesorModel.getAsesorByMail(datos.email);
        if (asesorExistente) {
          return res.status(400).json({ error: "El nuevo correo proporcionado ya está en uso" });
        }
      } catch (error) {
        console.error("Error buscando correo del asesor:", error);
        return res.status(500).json({ error: "Error interno al buscar el correo del asesor" });
      }
    }
  
    // Actualizar datos del asesor
    try {
     await AsesorModel.updateAsesor(datos, email);
    } catch (error) {
      console.error("Error al actualizar asesor:", error);
      return res.status(500).json({ error: "Error al actualizar los datos del asesor" });
    }
    return res.status(200).json({ message: "Los datos han sido cambiados correctamente"});
  }
  
  
  /**
   * Elimina un asesor de la base de datos a partir de su correo electrónico.
   *
   * Pasos:
   * 1. Obtiene el correo desde los parámetros de la consulta (`req.query.email`).
   * 2. Verifica si el asesor existe en la base de datos.
   * 3. Si no existe, responde con un error 404.
   * 4. Si existe, lo elimina.
   * 5. Retorna un mensaje de éxito o error según el resultado.
   *
   * @static
   * @async
   * @function deleteAsesor
   * @param {Request} req - Objeto de solicitud HTTP, espera el email del asesor como query.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta HTTP con mensaje de éxito o error.
   */
  static async deleteAsesor(req, res) {
    // obtener correo
    const correo = req.query.email

    // asegurarse de que el asesor exista
    if (await AsesorModel.getAsesorByMail(correo) ==  null) {
      res.status(404).json({ error: "No se ha encontrado el usuario" })
      return
    }

    // borrar asesor
    try {
      await AsesorModel.deleteAsesor(correo) 
    } catch (error) {
      res.status(500).json({ error: "Error interno al borrar el asesor" })
    }

    // enviar mensaje de que salio correctamente
    res.status(200).json({message: "El asesor ha sido borrado correctamente"})
  }

  /**
   * Recupera la lista de todos los asesores registrados en el sistema.
   *
   * Pasos:
   * 1. Llama a la base de datos para obtener todos los asesores.
   * 2. Si no hay asesores, retorna un error 404.
   * 3. Si hay asesores, devuelve solo los campos útiles: nombre, temas y correo.
   *
   * @static
   * @async
   * @function getAllAsesores
   * @param {Request} req - Objeto de solicitud HTTP (no se espera ningún parámetro específico).
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Lista de asesores o un mensaje de error.
   */
  static async getAllAsesores(req, res) {
      try {
          // Obtener todos los asesores de la base de datos
          const asesores = await AsesorModel.getAllAsesores();
          
          // Verificar si hay asesores y retorrnar error si no hay
          if (!asesores || asesores.length === 0) {
              return res.status(404).json({ error: "No hay asesores registrados" });
          }

          // Mapear los asesores para obtener solo los campos necesarios
          const respuesta = asesores.map(asesor => ({
              nombre: asesor.nombre,
              temas: asesor.area_especializacion,
              email: asesor.email
          }));
          
          // Retornar la respuesta con los asesores
          res.status(200).json(respuesta);
      } catch (error) {
          res.status(500).json({ error: "Error interno al obtener los asesores" });
      }
  }
}