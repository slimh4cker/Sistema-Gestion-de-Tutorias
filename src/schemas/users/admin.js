import z from 'zod'
import { nombreAtributo, emailAtributo, passwordAtributo } from './commons.js'

const adminSchema = z.object({
  nombre: nombreAtributo,
  email: emailAtributo,
  password: passwordAtributo, 
})

/**
 * Valida si un objeto `admin` cumple con **todos** los campos requeridos del esquema `adminSchema`.
 *
 * @function validarAdmin
 * @param {object} admin - Objeto que representa a un administrador.
 * @returns {boolean} - `true` si el objeto es válido completamente; `false` en caso contrario.
 */
export function validarAdmin(admin) {
  const resultado = adminSchema.safeParse(admin)
  return resultado.success;
}

/**
 * Valida si un objeto `admin` cumple con **algunos** de los campos del esquema `adminSchema`,
 * permitiendo omitir otros (validación parcial).
 *
 * @function validarParcialAdmin
 * @param {object} admin - Objeto parcial que representa a un administrador.
 * @returns {boolean} - `true` si el objeto cumple con la validación parcial; `false` en caso contrario.
 */
export function validarParcialAdmin(admin){
  const resultado = adminSchema.partial().safeParse(admin)
  return resultado.success;
}

/**
 * Realiza la validación completa del objeto `admin` utilizando Zod,
 * retornando el objeto de resultado completo de Zod (incluye `success`, `data`, y `error`).
 *
 * @function validarAdminZod
 * @param {object} admin - Objeto que representa a un administrador.
 * @returns {Zod.SafeParseReturnType<any, any>} - Resultado completo de la validación (éxito o errores).
 */
export function validarAdminZod(admin) {
  console.log(admin)
  return adminSchema.safeParse(admin)
}