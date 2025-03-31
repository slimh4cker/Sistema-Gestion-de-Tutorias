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
        email: "peres@mail.com",
        password: "pas"
      }
      
      const resultado = validarAlumno(alumno)
      expect(resultado).toBe(false)
    })

    it('probando validacion parcial sin email', () => {
      const alumno = {
        nombre: "Juan Perez",
        password: "Password123!"
      }
      
      const resultado = validarParcialAlumno(alumno)
      expect(resultado).toBe(true)
    })
  })  

  describe('Schema de asesor', () => {
      it('probando asesor con todos los datos correctos', () => {
        const asesor = {
          nombre: "Ana Lucia",
          email: "analucia@hotmail.com",
          password: "Password123!",
          area_especializacion: "Matematica"
        }

        const resultado = validarAsesor(asesor)
        expect(resultado).toBe(true)
      })

      it('probando asesor sin email', () => {
        const asesor = {
          nombre: "Ana Lucia",
          password: "Password123!",
          area_especializacion: "Matematica"
        }

        const resultado = validarAsesor(asesor)
        expect(resultado).toBe(false)
      })

      it('probando asesor con correo equivocado', () => {
        const asesor = {
          nombre: "Ana Lucia",
          email: "analucia@hotmail",
          password: "Password123!",
          area_especializacion: "Matematica"
        }
        const resultado = validarAsesor(asesor)
        expect(resultado).toBe(false)
      })

      it('probando validacion parcial (solo nombre)', () => {
        const asesor = {
          nombre: "Ana Lucia",
        }

        const resultado = validarParcialAsesor(asesor)
        expect(resultado).toBe(true)
      })
  })

  describe('Schema de admin', () => {
    it('probando admin con todos los datos correctos', () => {
      const admin = {
        nombre: "Elian Gonzalez",
        email: "elian@gmail.com",
        password: "Password123!"
      }
      const resultado = validarAdmin(admin)
      expect(resultado).toBe(true)
    })
    it('probando admin sin password', () => {
      const admin = {
        nombre: "Elian Gonzalez",
        email: "elian@gmail.com",
      }
      const resultado = validarAdmin(admin)
      expect(resultado).toBe(false)
    })
    it('probando validacion parcial de admin', () => {
      const admin = {
        email: "elian@mail.com",
      }
      const resultado = validarParcialAdmin(admin)
      expect(resultado).toBe(true)
    })
  })
})

