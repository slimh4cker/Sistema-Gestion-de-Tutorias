import { AsesorModel } from "../models/AmazonRDS/AsesorModel.js";
import { validarAsesor, validarParcialAsesor } from "../schemas/users/asesor.js";
import { obtenerMailDeReq } from "../utils/request.js";

// Estos son los metodos utilizados cuando se realiza algo que interactue con los asesores.
export class AsesorControler {
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

  static async createAsesor(req, res) {
    // Recuperar datos
    const asesor = req.body

    // comprobar modelo con Zod
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
    console.log(AsesorMail)

    try{
      await AsesorModel.createAsesor(asesor)
    } catch {
      res.status(500).json({ error: "Error interno al crear un asesor" })
      return
    }

    // retornar mensaje de que fue realizado correctamente
    res.status(201).json({ message: "Asesor creado correctamente" })

  }

  // Actualizar toda la tabla del asesor con los datos nuevos
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
    return res.status(200).json({ message: "Los datos han sido cambiados correctamente" });
  }
  
  

  static async deleteAsesor(req, res) {
    // obtener correo
    const correo = obtenerMailDeReq(req)

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
}