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
  return adminSchema.safeParse(admin)
}

// funcion para validar admin si NO NOS IMPORTA que cuente con todos los datos
// retorna true o false
export async function validarParcialAdmin(admin){
  return alumnoSchema.partial().safeParse(admin)
}