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
})