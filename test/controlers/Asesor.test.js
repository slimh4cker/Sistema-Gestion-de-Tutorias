// pruebas de los metodos del asesor
import { AsesorControler } from "../../src/controller/ControlerAsesor.js"
import { describe, expect, jest } from '@jest/globals';

// Mock de req y res de Express
const mockRequest = (body = {}, params = {}, query = {}, user = {}) => ({
  body,
  params,
  query,
  user // Añadimos el usuario autenticado (decodificado del JWT)
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};


describe('Controladores de Asesor', () => {
  let req, res;

  beforeEach(() => {
    // Resetear mocks antes de cada prueba
    jest.clearAllMocks();
    res = mockResponse();
  });

  describe('registrarAsesor', () => {
    it('debería registrar un nuevo asesor correctamente', async () => {
      req = mockRequest({
        nombre: 'Pedro',
        email: 'pedro@example.com',
        password: 'Password123!',
        area_especializacion: 'Matematicas',
      })

      await AsesorControler.createAsesor(req, res)

      expect(res.status).toHaveBeenCalledWith(201)

      // buscar el miso asesor
      req = mockRequest({}, {}, {}, {email: req.area_especializacion})
      res = mockResponse()

      await AsesorControler.getAsesorByMail(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        email: req.body.email,
        nombre: req.body.nombre,
        area_especializacion: req.body.area_especializacion
      }))

      // eliminar este alumno
      req = mockRequest({}, {}, {}, {email: req.body.email})
      res = mockResponse()

      await AsesorControler.deleteAsesor(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
    });

    it('debería manejar errores al registrar asesor sin todos los datos', async () => {
      req = mockRequest({
        // Datos incompletos para forzar error
        nombre: 'Pedro'
      })

      await AsesorControler.createAsesor(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }))
    }) 
  })


  describe('getAsesorByMail', () => {
    it('obtener el asesor con el correo juan@example', async () => { 
      req = mockRequest(
        {}, {}, {}, {email: 'ana@asesor.com'}
      )
      await AsesorControler.getAsesorByMail(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      
    })
    it('no obtener nada del correo', async () => {
      req = mockRequest(
        {}, {}, {}, {email: 'no@existo.com'}
      )

      await AsesorControler.getAsesorByMail(req, res)
      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('updateAsesor', () => {
    it('actualizar datos de alumno correctamente', async () => {
      req = mockRequest(
        { 
          nombre: 'Pedrito el de la esquina', area_especializacion: 'Fisica nuclear' 
        }, {}, {}, { email: 'pedro@example.com'}
      )

      await AsesorControler.updateAsesor(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('deleteAsesor', () => {
    it('debería eliminar un asesor correctamente', async () => {
      req = mockRequest(
        {}, {}, {}, { email: 'pedro@example.com'}
      )
      await AsesorControler.deleteAsesor(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
    })
    it('no deveria poder eliminar un asesor que no existe', async () => {
      req = mockRequest(
        {},{},{}, { email: 'no@existo.com'}
      )
    })
  })

})
