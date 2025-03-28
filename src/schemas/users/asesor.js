import z from 'zod'
import { nombreAtributo, emailAtributo, passwordAtributo } from 'commons'

const asesorSchema = z.object({
  nombre: nombreAtributo,
  email: emailAtributo,
  password: passwordAtributo, 
  area_especializacion: z.string().min(2).max(100)
})

// funcion para validar alumno si queremos que CUENTE CON TODOS LOS DATOS
// retorna true o false
export function validarAsesor(asesor) {
 const resultado =  asesorSchema.safeParse(asesor)
 return resultado.success;
}

// funcion para validar alumno si NO NOS IMPORTA que cuente con todos los datos
// retorna true o false
export function validarParcialAlumno(asesor){
  const resultado = asesorSchema.partial().safeParse(asesor) 
  return resultado.success;
}