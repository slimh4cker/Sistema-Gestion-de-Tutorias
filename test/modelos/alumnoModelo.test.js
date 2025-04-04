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

})

