import { AsesoriaModel } from '../models/AmazonRDS/AsesoriaModel.js';

export class AsesoriaControler {
  static async actualizarAsesoria(req, res) {
    try {
      // Validar datos de entrada
      const { 
        estado, 
        fecha_atencion, 
        hora_inicial, 
        hora_final, 
        total_horas, 
        porcentaje_cumplimiento, 
        requiere_sesiones 
      } = req.body;

      if (!estado || !['pendiente', 'asignada', 'completada', 'cancelada'].includes(estado)) {
        return res.status(400).json({ error: "Estado no válido o faltante" });
      }

      const { id } = req.query;
      const resultado = await AsesoriaModel.actualizarAsesoria(id, {
        estado,
        fecha_atencion,
        hora_inicial,
        hora_final,
        total_horas: parseFloat(total_horas),
        porcentaje_cumplimiento: parseFloat(porcentaje_cumplimiento),
        requiere_sesiones: Boolean(requiere_sesiones)
      });

      if (!resultado) {
        return res.status(404).json({ error: "Asesoría no encontrada" });
      }
      res.status(200).json({
        message: "Asesoría actualizada correctamente",
        datos: resultado
      });

    } catch (error) {
      console.error("Error en actualizarAsesoria:", error);
      res.status(500).json({ 
        error: "Error interno del servidor",
        detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}