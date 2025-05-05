import { AdminModel } from "../models/AmazonRDS/AdminModel.js"
import {validarAdmin, validarParcialAdmin } from "../schemas/users/admin.js"
import { obtenerMailDeReq } from "../utils/request.js";

export class AdminControler {
  // retorna los datos del admin segun el correo
  static async getAdminByMail(req, res){

    const correo = obtenerMailDeReq(req)

    let datos = null
    try {
      datos = AdminModel.getAdminByMail(correo)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el admin" })
    }

    if (!datos) {
      res.status(404).json({ error:"No se encontro datos del asesor"})
    }

    res.status(200).json(datos)
  }

  static async createAdmin(req,res) {
    //recuperar datos
    const admin = req.body

    // comprobar modelos
    if (!validarAdmin(admin)) {
      res.status(400).json({ error: JSON.parse(result.error.message)})
      return
    }

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

  static async updateAdmin(req,res) {
    const email = obtenerMailDeReq(req)
    const datos = req.body

    //verificar que este correcto
    if (!validarParcialAdmin(email)){
      res.status(400).json({error:"datos incorredctos del administrador"})
    }

    //verificar que si hay un correo se corrobore que no sea uno que ya exista
    if (datos.email){
      try {
        const adminMail = await AdminModel.getAdminByMail(datos.email)
        if (!adminMail){
          res.status(400).json({error: "el nuevo correo peticionado ya esta en uso"})
        }
      } catch (error) {
        res.status(500).json({error: "error interno al buscar el correo"})
      }

    }
    
    //alterar datos
    try {
      await AdminModel.updateAdmin(datos, email)
    } catch(error){
      res.status(500).json({error})
    }

    res.status(200).json({message: "Los datos han sido cambiados correctamente"})
  }

  static async deleteAdmin(req,res) {
    const correo = obtenerMailDeReq(req)


    AdminMail = null

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
