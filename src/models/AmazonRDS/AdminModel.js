import { modelo_cuenta_administrador } from "./Modelo_cuentas.js";

// Clase del alumno encargada de interactuar con la base de datos

export class AdminModel{
    // Metodo para obtener un alumno por su correo
    static async getAdminByMail(correo) {
        const correo_admin = await modelo_cuenta_administrador.findOne({
            where: {
                email: correo // unicamente se necesita buscar por correo
            },
        })
        return JSON.stringify(correo_admin, null,1) // Retorna un JSON con los datos del alumno
    }

    static async createAdmin(datos) {
        return await modelo_cuenta_administrador.create(datos)
    }

    static async updateAdmin(datos) {
        return await modelo_cuenta_administrador.update(datos, {
            where: {
                email: datos.email
            }
        })
    }
}