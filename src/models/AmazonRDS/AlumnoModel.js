import { modelo_cuenta_estudiante } from "./Modelo_cuentas.js";

// Clase del alumno encargada de interactuar con la base de datos

export class AlumnModel{
    // Metodo para obtener un alumno por su correo
    static async getAlumnoByMail(email) {
        const correo_alumno = await modelo_cuenta_estudiante.findOne({
            where: {
                email: email,// unicamente se necesita buscar por correo
                estado: 'activo' // y estado se igual a activo
            }
        })
        return correo_alumno // Retorna un JSON con los datos del alumno
    }

    static async createAlumno(datos) {
        try {
            const alumno = await modelo_cuenta_estudiante.findOne({
                where: {
                    email: datos.email
                }
            })
            if(!alumno){
                const crear_alumno = modelo_cuenta_estudiante.create({})
                console.log("Alumno creado correctamente")
                return crear_alumno
            }
            else if (alumno.dataValues.estado === 'inactivo'){
                return this.reactivarAlumno(datos)
            }
            else if(alumno.dataValues.estado === 'activo'){
                return null
            }
        }
        catch(error){

        }
        return await modelo_cuenta_estudiante.create(datos)
    }

    static async updateAlumno(datos) {
        return await modelo_cuenta_estudiante.update(datos, {
            where: {
                email: datos.email
            }
        })
    }

    static async deleteAlumno(correo) {
        return await modelo_cuenta_estudiante.update({estado: 2},{
            where: {
                email: correo.email
            }
        })
    }
    static async reactivarAlumno (datos) {
        console.log("Correo reactivado Correctamente")
        return await modelo_cuenta_estudiante.update({
            nombre: datos.nombre,
            password: datos.password,
            estado: 1

        },
        {
            where: {
                email: datos.email

            }
        })
    }
}