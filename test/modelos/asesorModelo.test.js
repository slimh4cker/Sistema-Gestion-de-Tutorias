import { AsesorModel } from "../../src/models/AmazonRDS/AsesorModel";

describe('validar asesor', () => {
  describe('obtener por correo', () => {
    it('probando obtener un asesor que existe', async () => {
      const correo = "carlos@asesor.com"

      const resultado = await AsesorModel.getAsesorByMail(correo)
      
      expect(resultado).toEqual(expect.objectContaining({
        email: correo
      }));
    })

    it('probando obtener un asesor que no existe', async () => {
      const correo = "no@existo.com"

      const resultado = await AsesorModel.getAsesorByMail(correo)
      
      expect(resultado).toBe(null)
    })
  });

  describe('crear y eliminar asesor', () => {
    it('creando un asesor y eliminandolo despues', async () => {
      const asesor = {
        nombre: "juanita",
        area_especializacion: "Redes de computadoras",
        email: "temporal@juanita.com",
        password: "Password123!",
      }

      // Crear el asesor
      await AsesorModel.createAsesor(asesor)
      
      // verificar que existe
      let resultado = await AsesorModel.getAsesorByMail(asesor.email)
      expect(resultado).toEqual(expect.objectContaining(
        asesor
      ))


      // eliminar el asesor
      await AsesorModel.deleteAsesor(asesor.email)
      
      // verificar que no existe
      let resultado_eliminar = await AsesorModel.getAsesorByMail(asesor.email)
      expect(resultado_eliminar).toBe(null)
    })
  })
})