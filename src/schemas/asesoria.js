import z from "zod";

// estados en los que puede estar el capmo "estados" de una solicitud
estados = ['pendiente', 'asignada', 'en _proceso', 'terminada', 'aplazada']



const asesoriaSchema = z.object({
 estado: z.enum(estados).optional(),
 fecha_creacion: z.string().datetime(),
 fecha_atencion: z.string().datetime(),
 hora_inicio: z.string().time(),
 hora_final: z.string().time(),
 total_horas: z.number().int().positive(),
 porcentaje_cumplimineto: z.number(),
 require_sesiones: z.boolean()
})

// TODO probar que el formato de fechas sea correcto y que la fecha de atencion sea mayor a la fecha de creacion y otras validaciones de fechas
export async function validarAsesoria(asesoria) {
  const resultado = asesoriaSchema.safeParse(asesoria);
  return resultado.success; 
}
