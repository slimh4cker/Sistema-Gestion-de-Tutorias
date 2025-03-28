import z from "zod";

modalidades = ['en_linea', 'presencial']
estados = ['pendiente', 'asignada', 'en_proceso', 'terminada', 'aplazada']
niveles_urgencia = ['baja', 'media', 'alta']

const solicitudSchema = z.object({
 tema: z.string().min(3).max(255),
 observaciones: z.string().max(255).optional(),
 fecha_limite: z.string().datetime(),
 modalidad: z.enum(modalidades),
 nivel_urgencia: z.enum(niveles_urgencia),
 estado: z.enum(estados).optional(),
})

// TODO probar que el formato de fechas sea correcto y que la fecha de atencion sea mayor a la fecha de creacion y otras validaciones de fechas
export async function validarSolicitud(solicitud) {
  const resultado = solicitudSchema.safeParse(solicitud);
  return resultado.success; 
}