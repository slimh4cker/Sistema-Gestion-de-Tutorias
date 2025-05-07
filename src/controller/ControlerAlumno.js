import { AlumnoModel } from "../models/AmazonRDS/AlumnoModel.js";
import { validarAlumno, validarParcialAlumno } from "../schemas/users/alumno.js";
import { obtenerMailDeReq } from "../utils/request.js";
import { hashPassword } from "../utils/security.js";

// Estos son los metodos utilizados cuando se realiza algo que interactue con los alumnos.
export class AlumnoControler {
    static async getAlumnoByMail(req, res) {
        try {
            const correo = obtenerMailDeReq(req);
            const datos = await AlumnoModel.getAlumnoByMail(correo);
            
            if (!datos) {
                return res.status(404).json({ error: "Alumno no encontrado" });
            }
            
            res.status(200).json(datos);
        } catch (error) {
            if (error.message.includes("no autenticado")) {
                res.status(401).json({ error: "Autenticación requerida" });
            } else {
                console.error("Error en getAlumnoByMail:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        }
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
      await AlumnoModel.createAlumno(req.body)
    } catch (error) {
      res.status(500).json({ error: "Error interno al crear un alumno" })
      return
    }
    

    // retornar mensaje de que fue realizado correctamente
    res.status(201).json({ message: "Alumno creado correctamente" })

  }

  // Actualizar toda la tabla del alumno con los datos nuevos
  static async updateAlumno(req, res) {
    try {
        const datos = req.body;
        if (!validarParcialAlumno(datos)) {
            return res.status(400).json({ error: "Datos en la petición incorrectos" });
        }

        const email = obtenerMailDeReq(req);
        if (!email) {
            return res.status(400).json({ error: "Correo no encontrado en el token" });
        }

        if (datos.password) {
            datos.password = await hashPassword(datos.password);
        }

        const resultado = await AlumnoModel.updateAlumno(email, datos);
        
        if (!resultado) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }
        delete resultado.password;
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