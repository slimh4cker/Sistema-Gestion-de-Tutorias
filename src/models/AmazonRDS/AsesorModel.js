import { modelo_cuenta_asesor} from "./Modelo_cuentas.js";

// Clase del alumno encargada de interactuar con la base de datos

export class AsesorModel{
    // Metodo para obtener un alumno por su correo
    static async getAsesorByMail(email) {
        const correo_asesor = await modelo_cuenta_asesor.findOne({
            where: {
                email: email,// unicamente se necesita buscar por correo
                estado: 'activo' // y estado se igual a activo
            }
        })
        return correo_asesor // Retorna un JSON con los datos del alumno
    }

    static async createAsesor(datos) {
        return await modelo_cuenta_asesor.create(datos)
    }

    static async updateAsesor(datos, emailOriginal) {
        return await modelo_cuenta_asesor.update(datos, {
            where: {
                email: emailOriginal
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