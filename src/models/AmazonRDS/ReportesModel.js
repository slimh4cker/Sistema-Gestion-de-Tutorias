import { modelo_reportes} from './Modelo_datos.js'

export class ReportesModel {
    static async getReporteById(id){
        const reporte = await modelo_reportes.findOne({
            where: {
                id: id
            },
        })
        return JSON.stringify(reporte, null,1)
    }

    static async createReporte(datos){
        return await modelo_reportes.create(datos)
    }

    static async updateReporte(datos){
        return await modelo_reportes.update(datos, {
            where: {
                id: datos.id
            }
        })
    }
}