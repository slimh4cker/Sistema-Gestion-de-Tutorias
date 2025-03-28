import z from 'zod'
import { nombreAtributo, emailAtributo, passwordAtributo } from 'commons'

const alumnoSchema = z.object({
  nombre: nombreAtributo,
  email: emailAtributo,
  password: passwordAtributo, 
})

// funcion para validar alumno si queremos que CUENTE CON TODOS LOS DATOS
// retorna true o false
export function validarAlumno(alumno) {
  const resultado = alumnoSchema.safeParse(alumno)
  return resultado.success;
}

// funcion para validar alumno si NO NOS IMPORTA que cuente con todos los datos
// retorna true o false
export function validarParcialAlumno(alumno){
  const resultado = alumnoSchema.partial().safeParse(alumno)
  return resultado.success; 
}