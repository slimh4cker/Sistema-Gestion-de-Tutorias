import z from 'zod'
import { nombreAtributo, emailAtributo, passwordAtributo } from './commons.js'

// Validador para arrays de horas entre 4 y 22
const horasSchema = z.array(
  z.number().int().min(4).max(22)
);

// Validador para el objeto disponibilidad
const disponibilidadSchema = z.record(horasSchema);

const asesorSchema = z.object({
  nombre: nombreAtributo,
  email: emailAtributo,
  password: passwordAtributo, 
  area_especializacion: z.string().min(2).max(100),
  disponibilidad: disponibilidadSchema
})

/**
 * Valida si un objeto `asesor` cumple con **todos** los campos requeridos definidos en `asesorSchema`.
 *
 * @function validarAsesor
 * @param {object} asesor - Objeto que representa a un asesor.
 * @returns {boolean} - `true` si el objeto es completamente válido; `false` si falta algún campo obligatorio.
 */
export function validarAsesor(asesor) {
 const resultado =  asesorSchema.safeParse(asesor)
 return resultado.success;
}

/**
 * Valida si un objeto `asesor` cumple con **algunos** campos del esquema `asesorSchema`,
 * permitiendo que falten otros campos (validación parcial).
 *
 * @function validarParcialAsesor
 * @param {object} asesor - Objeto parcial que representa a un asesor.
 * @returns {boolean} - `true` si el objeto cumple con la validación parcial; `false` si hay errores en los campos proporcionados.
 */
export function validarParcialAsesor(asesor){
  const resultado = asesorSchema.partial().safeParse(asesor)
  return resultado.success;
}

/**
 * Realiza la validación completa del objeto `asesor` utilizando Zod,
 * y retorna el resultado detallado de la validación (incluye `success`, `data`, y `error`).
 *
 * @function validarAsesorZod
 * @param {object} asesor - Objeto que representa a un asesor.
 * @returns {Zod.SafeParseReturnType<any, any>} - Resultado completo de la validación usando Zod.
 */
export function validarAsesorZod(asesor){
  return asesorSchema.safeParse(asesor)
}

/* 
 Asi se mira un asesor valido
  */
 const asesorValido = {
  nombre: "Ana",
  email: "ana@correo.com",
  password: "Aecreto123!",
  area_especializacion: "Psicología",
  disponibilidad: {
    lunes: [8, 9, 10],
    jueves: [15, 16, 17],
    domingo: [10]
  }
};



console.log(validarAsesorZod(asesorValido).error)