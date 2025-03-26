import z from 'zod'

const adminSchema = z.object({
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

export async function validarAdmin(admin) {
  return adminSchema.safeParse(admin)
}

export async function validarParcialAdmin(admin){
  return alumnoSchema.partial().safeParse(admin)
}