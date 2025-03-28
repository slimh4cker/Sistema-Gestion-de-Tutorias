import z from 'zod'
import { nombreAtributo, emailAtributo, passwordAtributo } from 'commons'

const adminSchema = z.object({
  nombre: nombreAtributo,
  email: emailAtributo,
  password: passwordAtributo, 
})

// funcion para validar admin si queremos que CUENTE CON TODOS LOS DATOS
// retorna true o false
export async function validarAdmin(admin) {
  const resultado = adminSchema.safeParse(admin)
  return resultado.success;
}

// funcion para validar admin si NO NOS IMPORTA que cuente con todos los datos
// retorna true o false
export async function validarParcialAdmin(admin){
  const resultado = alumnoSchema.partial().safeParse(admin)
  return resultado.success;
}