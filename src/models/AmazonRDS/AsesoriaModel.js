import { modelo_cuenta_estudiante } from "./Modelo_cuentas.js";
import { modelo_asesorias, modelo_solicitudes } from "./Modelo_datos.js";
import { AlumnoModel } from "./AlumnoModel.js"

export class AsesoriaModel{
    // Método que obtiene las asesorias relacinandas al correo de un alumno
    static async getAseoriaByAlumnoEmail(email){
        const asesoria_alumno_email = await modelo_asesorias.findOne({
            include: [{ // Include es un INNER JOIN 
                model: modelo_solicitudes,
                include: [{
                    model: modelo_cuenta_estudiante,
                    where: {
                        email: email
                    }
                }],
            }],
        })
        return asesoria_alumno_email
    }
    static async crearAsesoria(datos){
        return await modelo_asesorias.create(datos)
    }
}

AsesoriaModel.getAseoriaByAlumnoEmail("diegosoto@gmail.org").then((asesoria)=>{
    console.log(asesoria)
})