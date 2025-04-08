import { AlumnoModel } from "../models/AmazonRDS/AlumnoModel.js";
import { validarAlumno, validarParcialAlumno } from "../schemas/users/alumno.js";
import { emailAtributo } from "../schemas/users/commons.js";
import { obtenerMailDeReq } from "../utils/request.js";

// Estos son los metodos utilizados cuando se realiza algo que interactue con los alumnos.
export class AlumnoControler {
  static async getAlumnoByMail(req, res) {
    // Recuperar correo
    const correo = obtenerMailDeReq(req)

    // Buscar en la base de datos los datos de el alumno segun este correo
    let datos
    try {
      datos = await AlumnoModel.getAlumnoByMail(correo)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el alumno" })
      return
    }
    
    
    if (datos == null) {
      res.status(404).json({ error: "No se ha encontrado el alumno" })
      return
    }

    // Retornar datos
    res.status(200).json(datos)
  }

  static async createAlumno(req, res) {
    // Recuperar datos
    const alumno = req.body

    // comprobar modelo con Zod
    if (!validarAlumno(alumno)) {
      res.status(400).json({ error: "datos del alumno no validos" })
      return
    }

    let alumnoMail = false
    try {
      alumnoMail = await AlumnoModel.getAlumnoByMail(alumno.email)
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar el correo" })
      return  
    }
    
    // comprobar que no exista ya en la base de datos el correo
    console.log(alumnoMail)
    if (alumnoMail != null) {
      res.status(400).json({ error: "Ya existe un alumno con ese correo" })
      return
    }

    try {
      AlumnoModel.createAlumno(req.body)
    } catch (error) {
      res.status(500).json({ error: "Error interno al crear un alumno" })
      return
    }
    

    // retornar mensaje de que fue realizado correctamente
    res.status(201).json({ message: "Alumno creado correctamente" })

  }

  // Actualizar toda la tabla del alumno con los datos nuevos
  static async updateAlumno(req, res) {
    // obtener datos
    let datos = req.body

    // asegurarme que sus datos esten correctos
    if (! validarParcialAlumno(datos)) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    // obtener correo
    const email = obtenerMailDeReq(req)
    if (!email) {
      res.status(400).json({ error: "No se ha encontrado el correo al momento de alterar el usuario" })
      return
    }
    
    // alterar datos
    try {
      await AlumnoModel.updateAlumno(datos, email)
    } catch (error) {
      res.status(500).json({error})
    }
    
   
    // enviar mensaje de que salio correctamente
    res.status(200).json({message: "Los datos han sido cambiados correctamente", datos: datos, email_de_origen: email})
  }

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