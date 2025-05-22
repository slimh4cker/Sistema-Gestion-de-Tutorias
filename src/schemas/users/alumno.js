import z from 'zod'
import { nombreAtributo, emailAtributo, passwordAtributo } from './commons.js'

const alumnoSchema = z.object({
  nombre: nombreAtributo,
  email: emailAtributo,
  password: passwordAtributo, 
})

/**
 * Valida si un objeto `alumno` cumple con **todos** los campos requeridos definidos en `alumnoSchema`.
 *
 * @function validarAlumno
 * @param {object} alumno - Objeto que representa a un alumno.
 * @returns {boolean} - `true` si el objeto es completamente válido; `false` si le falta algún campo obligatorio.
 */
export function validarAlumno(alumno) {
  const resultado = alumnoSchema.safeParse(alumno)
  return resultado.success;
}

/**
 * Valida si un objeto `alumno` cumple con **algunos** campos del esquema `alumnoSchema`,
 * permitiendo que falten otros campos (validación parcial).
 *
 * @function validarParcialAlumno
 * @param {object} alumno - Objeto parcial que representa a un alumno.
 * @returns {boolean} - `true` si el objeto cumple con la validación parcial; `false` si hay errores incluso en los campos proporcionados.
 */
export function validarParcialAlumno(alumno){
  const resultado = alumnoSchema.partial().safeParse(alumno)
  return resultado.success; 
}

/**
 * Realiza la validación completa del objeto `alumno` utilizando Zod,
 * y retorna el resultado completo de la validación (incluye éxito, datos y errores).
 *
 * @function validarAlumnoZod
 * @param {object} alumno - Objeto que representa a un alumno.
 * @returns {Zod.SafeParseReturnType<any, any>} - Resultado detallado de la validación (`success`, `data`, `error`).
 */
export function validarAlumnoZod(alumno){
  return alumnoSchema.safeParse(alumno)
}