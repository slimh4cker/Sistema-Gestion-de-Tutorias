// Esta carpeta cuenta con atributos comunes entre los modelos de los usuarios, tales
// como nombre, email y contrase;a
import z from 'zod'


// define los atributos para un nombre
export const nombreAtributo = z
  .string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto"
  })
  .min(1, { message: "El nombre no puede estar vacío" })
  .max(100, { message: "El nombre no puede tener más de 100 caracteres" });

// define los atributos de un correo electronico
export const emailAtributo = z
  .string({
    required_error: "El email es requerido",
    invalid_type_error: "El email debe ser un texto"
  })
  .email({ message: "Debe ser un email válido" })
  .max(100, { message: "El email no puede tener más de 100 caracteres" });

// define los atributos de una contrasenia
export const passwordAtributo = z
  .string({
    required_error: "La contraseña es requerida",
    invalid_type_error: "La contraseña debe ser un texto"
  })
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  .max(255, { message: "La contraseña no puede tener más de 255 caracteres" })
  .refine(
    password => /[A-Z]/.test(password), 
    { message: "La contraseña debe contener al menos una letra mayúscula" }
  )
  .refine(
    password => /[0-9]/.test(password), 
    { message: "La contraseña debe contener al menos un número" }
  );
