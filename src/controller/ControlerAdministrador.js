import { AdminModel } from "../models/AmazonRDS/AdminModel.js"
import {validarAdmin, validarParcialAdmin } from " ../schemas/users/admin.js"

export class AdminControler {
  // retorna los datos del admin segun el correo
  static async getAdminByMail(req, res){

    const correo = obtenerMailDeReq(req)

    const datos = AdminModel.getAdminByMail(correo)

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

    // comprobar que no exista otro con este correo
    if (AdminModel.getAdminByMail(admin.email)) {
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
    res.status(200).json({ message: "Administrador creado correctamente"})
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
      if (!AdminModel.getAdminByMail(datos.email)){
        res.status(400).json({error: "el nuevo correo peticionado ya esta en uso"})
      }
    }
    
    //alterar datos
    try {
      AdminModel.updateAdmin(datos, email)
    } catch(error){
      res.status(500).json({error})
    }

    res.status(200).json({message: "Los datos han sido cambiados correctamente"})
  }

  static async deleteAdmin(req,res) {
    const correo = obtenerMailDeReq(req)

    if (!AdminModel.getAdminByMail(correo)) {
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


  static async obtenerMailDeReq(req){
    return req.user.email
  }
}
