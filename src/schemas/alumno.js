import z from 'zod'

const alumnoSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email().maxLength(150),
  password: z.string().min(8).max(255)
  .refine(password => {
    // Al menos una mayúscula
    const hasUpperCase = /[A-Z]/.test(password);
    // Al menos un número
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCase && hasNumber;
  }),
})

// funcion para validar alumno si queremos que CUENTE CON TODOS LOS DATOS
// retorna true o false
export function validarAlumno(alumno) {
  return alumnoSchema.safeParse(alumno)
}

// funcion para validar alumno si NO NOS IMPORTA que cuente con todos los datos
// retorna true o false
export function validarParcialAlumno(alumno){
  return alumnoSchema.partial().safeParse(alumno) 
}