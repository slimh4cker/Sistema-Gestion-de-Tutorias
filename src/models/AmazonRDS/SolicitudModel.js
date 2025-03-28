import { sequelize } from "../../utils/database_connection.js";
import { modelo_cuenta_asesor, modelo_cuenta_estudiante } from "./Modelo_cuentas.js";
import { modelo_solicitudes } from "./Modelo_datos.js";

export class SolicitudModel{
    static async buscarSolicitudByID(id){
        const buscar_solicitud = await modelo_solicitudes.findOne({
            attributes: ['id',
            [sequelize.col("modelo_cuenta_estudiante.nombre"),'estudiante_id'],
            [sequelize.col("modelo_cuenta_asesor.nombre"),'asesor_id'],
            'tema',
            'observaciones', 
            'fecha_limite', 
            'modalidad', 
            'nivel_urgencia', 
            'estado'],
            include:{
                model: modelo_cuenta_estudiante,
                attributes: []
            },
            include: {
                model: modelo_cuenta_asesor,
                attributes: []
            },
            where: {
                id: id
            },
        })
        return JSON.stringify(buscar_solicitud, null, 1)
    }

    static async agregarSolicitud(datos){
            return await modelo_solicitudes.create(datos)
    }
}