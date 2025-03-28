import { modelo_cuenta_estudiante } from "./Modelo_cuentas.js";
import { modelo_asesorias, modelo_solicitudes } from "./Modelo_datos.js";

export class AsesoriaModel{
    // Método que obtiene las asesorias relacinandas al correo de un alumno
    static async getAseoriaByAlumnoEmail(email){
        const asesoria_alumno_email = await modelo_asesorias.findAll(email,{
            include: [{ // Include es un INNER JOIN 
                model: modelo_solicitudes, // Se 
                include: [{
                    model: modelo_cuenta_estudiante,
                    where: {
                        email: email
                    }
                }],
            }],
        })
        return JSON.stringify(asesoria_alumno_email, null, 1)
    }
    static async crearAsesoria(datos){
        return await modelo_asesorias.create(datos)
    }
}