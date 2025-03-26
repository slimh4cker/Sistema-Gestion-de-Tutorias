import { AlumnoModel } from "../models/AlumnoModel.js";
import { validarAlumno, validarParcialAlumno } from "../schemas/alumno.js";

// Estos son los metodos utilizados cuando se realiza algo que interactue con los alumnos.
export class AlumnoControler {
  static async getAlumnoByMail(req, res) {
    // Recuperar correo
    const correo = req.user.email 
    // TODO, asegurarse de que este funcione con nuestra implementacion de JWT o cookies

    // Buscar en la base de datos los datos de el alumno segun este correo
    const datos = AlumnoModel.getAlumnoByMail(correo)

    if (!datos) {
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
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    // comprobar que no exista ya en la base de datos el correo
    if (AlumnoModel.getAlumnoByMail(alumno.email)) {
      res.status(400).json({ error: "Ya existe un alumno con ese correo" })
      return
    }

    AlumnoModel.createAlumno(req.body)

    // retornar mensaje de que fue realizado correctamente
    res.status(200).json({ message: "Alumno creado correctamente" })

  }

  // Actualizar toda la tabla del alumno con los datos nuevos
  static async updateAlumno(req, res) {
    // obtener datos
    datos = req.body

    // asegurarme que sus datos esten correctos
    if (! validarParcialAlumno(datos)) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    // obtener correo
    const email = req.user.email
    if (!email) {
      res.status(400).json({ error: "No se ha encontrado el correo al momento de alterar el usuario" })
      return
    }
    
    // alterar datos
    try {
      AlumnoModel.updateAlumno(datos, email)
    } catch (error) {
      res.status(500).json({error})
    }
   
    // enviar mensaje de que salio correctamente
    res.status(200).json({message: "Los datos han sido cambiados correctamente"})
    

  }

  static async deleteAlumno(req, res) {
    // obtener correo
    const correo = req.user.email
    // TODO asegurarse de que este funcione con nuestra implementacion de JWT o cookies

    // asegurarse de que el alumno exista
    if (!AlumnoModel.getAlumnoByMail(correo)) {
      res.status(404).json({ error: "No se ha encontrado el alumno" })
      return
    }

    // borrar alumno
    AlumnoModel.deleteAlumno(correo)

    // enviar mensaje de que salio correctamente
    res.status(200).json({message: "El alumno ha sido borrado correctamente"})
  }
}