import z from 'zod'

const asesorSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email().max(150),
  password: z.string().min(8).max(255)
  .refine(password => {
    // Al menos una mayúscula
    const hasUpperCase = /[A-Z]/.test(password);
    // Al menos un número
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCase && hasNumber;
  }),
  area_especializacion: z.string().min(2).max(100)
})

// funcion para validar alumno si queremos que CUENTE CON TODOS LOS DATOS
// retorna true o false
export function validarAsesor(asesor) {
  return asesorSchema.safeParse(asesor)
}

// funcion para validar alumno si NO NOS IMPORTA que cuente con todos los datos
// retorna true o false
export function validarParcialAlumno(asesor){
  return asesorSchema.partial().safeParse(asesor) 
}