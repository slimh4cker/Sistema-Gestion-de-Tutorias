// Validacion de esquemas de cuentas
import { validarAdmin, validarParcialAdmin } from "../../src/schemas/users/admin.js"
import { validarAlumno, validarParcialAlumno } from "../../src/schemas/users/alumno.js"
import { validarAsesor, validarParcialAsesor } from "../../src/schemas/users/asesor.js"
import { describe, jest } from '@jest/globals'




describe('validacion de esquemas de usuario', () => {
  describe('Schema de alumno', () => {
    it('probando alumno con todos los datos correctos', () => {
      const alumno = {
        nombre: "Juan Perez",
        email: "peres@mail.com",
        password: "Password123!"
      }
      
      const resultado = validarAlumno(alumno)
      expect(resultado).toBe(true)
    })
    
    it('probando alumno sin email', () => {
      const alumno = {
        nombre: "Juan Perez",
        password: "Password123!"
      }
      
      const resultado = validarAlumno(alumno)
      expect(resultado).toBe(false)
    })

    it('probando alumo con contrasenia invalida ', () => {
      const alumno = {
        nombre: "Juan Perez",
        email: "peres@mail",
        password: "pas"
      }
      
      const resultado = validarAlumno(alumno)
      expect(resultado).toBe(false)
    })

    it('probando validacion parcial sin email', () => {
      alumno = {
        nombre: "Juan Perez",
        password: "Password123!"
      }
      
      resultado = validarAlumnoParcial(alumno)
      expect(resultado).toBe(true)
    })
  })

})

