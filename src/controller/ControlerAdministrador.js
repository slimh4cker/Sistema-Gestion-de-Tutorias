import { AdminModel } from "../models/AmazonRDS/AdminModel.js"
import {validarAdmin, validarParcialAdmin } from "../schemas/users/admin.js"
import { obtenerMailDeReq } from "../utils/request.js";

/**
 * Clase que encapsula los métodos para manejar las operaciones relacionadas con los administradores.
 */

export class AdminControler {
  /**
   * Recupera los datos de un administrador mediante su correo electrónico.
   *
   * Pasos:
   * 1. Obtiene el correo desde el request.
   * 2. Consulta la base de datos para buscar un administrador con ese correo.
   * 3. Si se encuentra, responde con los datos del administrador.
   * 4. Si no se encuentra, responde con error 404.
   * 5. Si ocurre un error durante la consulta, responde con error 500.
   *
   * @static
   * @async
   * @function getAdminByMail
   * @param {Request} req - Objeto de solicitud HTTP con información del administrador.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta con los datos del administrador o un mensaje de error.
   */
  static async getAdminByMail(req, res){

    const correo = obtenerMailDeReq(req)

    let datos = null
    try {
      datos = await AdminModel.getAdminByMail(correo)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el admin" })
    }

    if (!datos) {
      res.status(404).json({ error:"No se encontro datos del asesor"})
    }

    return res.status(200).json(datos)
  }

  /**
 * Crea un nuevo administrador en el sistema.
 *
 * Este método realiza las siguientes operaciones:
 * 1. Recupera los datos del nuevo administrador desde el cuerpo del request.
 * 2. Valida que los datos cumplan con el esquema definido.
 * 3. Verifica que no exista otro administrador con el mismo correo.
 * 4. Inserta al nuevo administrador en la base de datos.
 * 5. Devuelve una respuesta HTTP indicando el resultado de la operación.
 *
 * @static
 * @async
 * @function createAdmin
 * @param {Request} req - Objeto de solicitud HTTP con los datos del nuevo administrador.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} - Respuesta HTTP con el estado correspondiente.
 */
  static async createAdmin(req,res) {
    //recuperar datos
    const admin = req.body

    // comprobar modelos
    if (!validarAdmin(admin)) {
      res.status(400).json({ error: JSON.parse(result.error.message)})
      return
    }

    let AdminMail = false
    try {
      AdminMail = AdminModel.getAdminByMail(admin.email)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el correo" })
      return  
    }
    
    // comprobar que no exista otro con este correo
    if (AdminMail) {
      res.status(400).json({ error: "Ya existe un admin con ese correo"})
      return
    }

    // ejecutar creacion
    try {
      AdminModel.createAdmin(admin)
    } catch (error) {
      res.status(500).json({error: "error interno al crar un administrador"})
    }

    // retornar mensaje de que fue realizado correctamente
    res.status(201).json({ message: "Administrador creado correctamente"})
  }

  /**
 * Actualiza los datos de un administrador en la base de datos.
 * 
 * Pasos:
 * 1. Verifica que los datos del administrador sean correctos.
 * 2. Si se incluye un nuevo correo, valida que no esté ya en uso.
 * 3. Si las validaciones son correctas, actualiza los datos del administrador.
 * 4. Devuelve una respuesta HTTP según el resultado de la operación.
 *
 * @async
 * @function updateAdmin
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Responde con un mensaje de éxito o error.
 */
  static async updateAdmin(req,res) {
    const email = obtenerMailDeReq(req)
    const datos = req.body

    //verificar que este correcto, como no existe un administrador solo se envia un objeto con el correo
    if (!validarParcialAdmin({ email: email })){
      return res.status(400).json({error:"datos incorredctos del administrador"})
    }

    //verificar que si hay un correo se corrobore que no sea uno que ya exista
    if (datos.email){
      try {
        const adminMail = await AdminModel.getAdminByMail(datos.email)
        if (adminMail){
          return res.status(400).json({error: "el nuevo correo peticionado ya esta en uso"})
        }
      } catch (error) {
        return res.status(500).json({error: "error interno al buscar el correo"})
      }
    }
    
    //alterar datos
    try {
      await AdminModel.updateAdmin(datos, email)
    } catch(error){
      return res.status(500).json({error})
    }

    return res.status(200).json({message: "Los datos han sido cambiados correctamente"})
  }


  /**
   * Elimina un administrador basado en el correo electrónico extraído del request.
   * 
   * Pasos:
   * 1. Extrae el correo desde el request.
   * 2. Verifica si el administrador existe en la base de datos.
   * 3. Si existe, lo elimina.
   * 4. Devuelve una respuesta HTTP con el resultado.
   *
   * @param {Request} req - Objeto de solicitud HTTP.
   * @param {Response} res - Objeto de respuesta HTTP.
 */
  static async deleteAdmin(req,res) {
    const correo = obtenerMailDeReq(req)

    let AdminMail = null

    // obtener los datos del admin para comprobar que si exista este
    try {
      AdminMail = AdminModel.getAdminByMail(correo)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el correo" })
    }
    if (!AdminMail) {
      res.status(404).json({error: "no se encontro el administador"})
    }

    // borrar de la base de datos
    try {
      AdminModel.deleteAdmin(correo)
    } catch (error) {
      res.status(500).json({error: "error interno: no se pudo borrar administrador"})
    }

    // respuesta de ejecucion correcta
    res.status(200).json({ message: "El administrador fue eliminado correctamente"})
  }
}
