import { sequelize } from "../../utils/database_connection.js";
import { modelo_cuenta_asesor } from "./Modelo_cuentas.js";
import { modelo_contenido_apoyo } from "./Modelo_datos.js";

export class ContenidoModel{
    // Metodo para obtener un contenido por su id
    static async getContenidoById(id) {
        const contenido = await modelo_contenido_apoyo.findOne({
            // Join modelo-asesor -> contenido-apoyo
            attributes: ["id", [sequelize.col("modelo_cuenta_asesor.nombre"), "id_asesor"], "titulo", "descripcion", "url_video", 'fecha_subida', 'estado' ],
            include: {
                model: modelo_cuenta_asesor,
                attributes: []
            },
            where: {
                id: id // unicamente se necesita buscar por id
            },
        })
        return JSON.stringify(contenido, null,1) // Retorna un JSON con los datos del contenido
    }

    // Creación del contenido
    static async createContenido(datos) {
        return await modelo_contenido_apoyo.create(datos)
    }

    // Actualización de algún campo en el contenido seleccionado
    static async updateContenido(datos) {
        return await modelo_contenido_apoyo.update(datos, {
            where: {
                id: datos.id
            }
        })
    }
}