import z from "zod";

const modalidades = ['en_linea', 'presencial']
const estados = ['pendiente', 'asignada', 'en_proceso', 'terminada', 'aplazada']
const niveles_urgencia = ['baja', 'media', 'alta']

const solicitudSchema = z.object({
 tema: z.string().min(3).max(255),
 observaciones: z.string().max(255).optional(),
 fecha_limite: z.string().datetime()
  .refine((fecha) => {
    const fechaLimite = new Date(fecha);
    const ahora = new Date();
    return fechaLimite > ahora;
  },
),
estudiante_id: z.number().int(),
 modalidad: z.enum(modalidades),
 nivel_urgencia: z.enum(niveles_urgencia),
 estado: z.enum(estados).optional(),
})

/**
 * Valida si un objeto `solicitud` cumple con **todos** los campos requeridos definidos en `solicitudSchema`.
 *
 * @async
 * @function validarSolicitud
 * @param {object} solicitud - Objeto que representa una solicitud.
 * @returns {Promise<boolean>} - `true` si la solicitud es completamente válida; `false` si falta algún campo obligatorio o hay errores.
 */
export async function validarSolicitud(solicitud) {
  const resultado = solicitudSchema.safeParse(solicitud);
  return resultado.success; 
}