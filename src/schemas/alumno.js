import z from 'zod'

const alumnoSchema = z.object({
  nombre: z.string().min(2).max(100),
  curso: z.string().min(2).max(255),
  email: z.string().email().maxLength(150),
  telefono: z.string().regex(/^\d{9}$/),
  password: z.string().min(8).max(255),
  matricula: z.string().size(9),

})

export function validarAlumno(alumno) {
  return alumnoSchema.safeParse(alumno)
}