import { modelo_cuenta_estudiante } from "./Modelo_cuentas.js";

// Clase del alumno encargada de interactuar con la base de datos

export class AlumnoModel{
    // Metodo para obtener un alumno por su correo
    static async getAlumnoByMail(correo) {
        const correo_alumno = await modelo_cuenta_estudiante.findOne({
            where: {
                email: correo // unicamente se necesita buscar por correo
            },
        })
        return JSON.stringify(correo_alumno, null,1) // Retorna un JSON con los datos del alumno
    }

    static async createAlumno(datos) {
        return await modelo_cuenta_estudiante.create(datos)
    }

    static async updateAlumno(datos) {
        return await modelo_cuenta_estudiante.update(datos, {
            where: {
                email: datos.email
            }
        })
    }
}