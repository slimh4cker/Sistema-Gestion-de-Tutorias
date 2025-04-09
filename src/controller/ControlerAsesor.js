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
      res.status(400).json({ error: JSON.parse(result.error.message) })
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

    if (AsesorMail== null) {
      res.status(400).json({ error: "Ya existe un asesor con ese correo" })
      return
    }

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
    // obtener datos
    datos = req.body

    // asegurarme que sus datos esten correctos
    if (! validarParcialAsesor(datos)) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    // obtener correo
    const email = obtenerMaildeReq(req)
    if (!email) {
      res.status(400).json({ error: "No se ha encontrado el correo al momento de alterar el usuario" })
      return
    }
    
    // alterar datos
    try {
      AsesorModel.updateAsesor(datos, email)
    } catch (error) {
      res.status(500).json({error})
      return
    }
   
    // enviar mensaje de que salio correctamente
    res.status(200).json({message: "Los datos han sido cambiados correctamente"})
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