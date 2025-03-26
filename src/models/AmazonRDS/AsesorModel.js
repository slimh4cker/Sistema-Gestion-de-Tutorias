import { modelo_cuenta_asesor} from "./Modelo_cuentas.js";

// Clase del alumno encargada de interactuar con la base de datos

export class AsesorModel{
    // Metodo para obtener un alumno por su correo
    static async getAsesorByMail(datos) {
        const correo_asesor = await modelo_cuenta_asesor.findOne({
            where: {
                email: correo // unicamente se necesita buscar por correo
            },
        })
        return JSON.stringify(correo_asesor, null,1) // Retorna un JSON con los datos del alumno
    }

    static async createAsesor(datos) {
        return await modelo_cuenta_asesor.create(datos)
    }

    static async updateAsesor(datos) {
        return await modelo_cuenta_asesor.update(datos, {
            where: {
                email: datos.email
            }
        })
    }

    static async deleteAsesor(datos){
        const deleteAsesor = await modelo_cuenta_asesor.destroy({
            where: {
                email: datos.email
            }
        });
        return deleteAsesor > 0; // Si se elimino retorna true, si no retorna false
    }
}