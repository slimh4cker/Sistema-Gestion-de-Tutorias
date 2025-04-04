import { modelo_cuenta_estudiante } from "./Modelo_cuentas.js";

// Clase del alumno encargada de interactuar con la base de datos

export class AlumnoModel{
    // Metodo para obtener un alumno por su correo
    // Si no encuentra el alumno devuelve null
    // de lo contrario retorna un diccionario con los datos del alumno
    static async getAlumnoByMail(email) {
        const alumno = await modelo_cuenta_estudiante.findOne({
            where: {
                email: email, // Unicamente se necesita buscar por correo
                estado: 'activo' // Y estado debe ser igual a activo
            },
            raw: true
        });
    
        return alumno || null;
    }    

    static async createAlumno(datos) {
        return await modelo_cuenta_estudiante.create(datos)
    }

    static async updateAlumno(datos, emailOriginal) {
        return await modelo_cuenta_estudiante.update(datos, {
            where: {
                email: emailOriginal
            }
        })
    }

    static async deleteAlumno(correo) {
        return await modelo_cuenta_estudiante.update({estado: 2},{
            where: {
                email: correo
            }
        })
    }
}