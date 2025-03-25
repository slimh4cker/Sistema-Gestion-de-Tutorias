import { AlumnoModel } from "../models/AlumnoModel.js";
import { validarAlumno } from "../schemas/alumno.js";

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

    // retornar mensaje de que fue realizado correctamente
    res.status(200).json({ message: "Alumno creado correctamente" })

  }
}