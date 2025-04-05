import { AlumnoModel } from "../../src/models/AmazonRDS/AlumnoModel.js"

describe('validar alumno', () => { 
  describe('obtener por correo', () => {
    it('probando obtener un alumno que existe', async () => {
      const correo = "laura@estudiante.com"

      const resultado = await AlumnoModel.getAlumnoByMail(correo)

      expect(resultado).toEqual(expect.objectContaining({
        email: 'laura@estudiante.com'
      }));
    })

    it('probando obtener un alumno que no existe', async () => {
      const correo = "no@existo.com"

      const resultado = await AlumnoModel.getAlumnoByMail(correo)

      expect(resultado).toBe(null)
    })
  })

  describe('alterar alumno', () => {
    it('alterando el nombre a pablo', async () => {
      const alumnoOriginal = {
        nombre: "Laura Fernández",
        email: "laura@estudiante.com"
      }

      const alumnoAlterado = {
        nombre: "laurita",
        email: "nolaura@existe.com"
      }
      await AlumnoModel.updateAlumno(alumnoAlterado, alumnoOriginal.email)

      //revisar que este correcto
      const resultado = await AlumnoModel.getAlumnoByMail(alumnoAlterado.email)

      expect(resultado).toEqual(expect.objectContaining({
        email: alumnoAlterado.email,
        nombre: alumnoAlterado.nombre
      }));

      // alterar a estado previo

      await AlumnoModel.updateAlumno(alumnoOriginal, alumnoAlterado.email)
    })
  })

  describe('crear alumno y borrar alumno', () => {
    it('creando un alumno y borrandolo', async () => {
      const alumno = {
        nombre : "Juana de la curz",
        email: "Juana@temporal.com",
        password: "myPassword123",
      }

      await AlumnoModel.createAlumno(alumno)

      // comprobar que exista
      const resultado = await AlumnoModel.getAlumnoByMail(alumno.email)
      expect(resultado).toEqual(expect.objectContaining({
        email: alumno.email,
        nombre: alumno.nombre
      }))

      // deshacer los cambios
      await AlumnoModel.deleteAlumno(alumno.email)
    })
  })
})

