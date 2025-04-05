// pruebas de los metodos de alumno
// Import de los controlers
//import { AlumnoControler } from "../../src/controller/ControlerAlumno.js"
import { jest } from '@jest/globals';


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

// Mock de jwt.verify (opcional, si tus controladores lo usan)
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ email: 'juan@example.com' })
}));

let AlumnoControler;

beforeAll(async () => {
  const { AlumnoControler: Controller } = await import("../../src/controller/ControlerAlumno.js");
  AlumnoControler = Controller;
});

describe('Controladores de Alumno', () => {
  let req, res;

  beforeEach(() => {
    // Resetear mocks antes de cada prueba
    jest.clearAllMocks();
    res = mockResponse();
  });

  describe('registrarEstudiante', () => {
    it('debería registrar un nuevo estudiante correctamente', async () => {
      req = mockRequest({
        nombre: 'Juan',
        email: 'juan@example.com',
        password: 'Password123!'
      });

      await AlumnoControler.createAlumno(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería manejar errores al registrar estudiante', async () => {
      req = mockRequest({
        // Datos incompletos para forzar error
        nombre: 'Juan'
      });

      await AlumnoControler.createAlumno(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('getAlumnoByMail', () => {
    it('debería obtener un alumno por email correctamente', async () => {
      req = mockRequest({}, {}, {}, {email: 'laura@estudiante.com'} );

      await AlumnoControler.getAlumnoByMail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        email: 'laura@estudiante.com'})
      );
    });

    it('deveria retornar vacio', async () =>{
      req = mockRequest({}, {}, {}, {email: 'no@existo.com'} );

      await AlumnoControler.getAlumnoByMail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });      
  });

  describe('updateAlumno', () => {
    it('debería actualizar los datos de un alumno correctamente', async () => {
      req = mockRequest(
        { nombre: 'Juan Actualizado' },
        { },
        { },
        { email: 'juan@example.com' }
      );

      await AlumnoControler.updateAlumno(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        email_de_origen: 'juan@example.com'
      }));
    });

  });

  describe('deleteAlumno', () => {
    it('debería eliminar un alumno correctamente', async () => {
      req = mockRequest({}, {}, {}, { email: 'juan@example.com' });

      // Eliminar alumno
      await AlumnoControler.deleteAlumno(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
  
      // Verificar que el alumno ya no existe
      req = mockRequest({}, {}, {}, { email: 'juan@example.com' });
      res = mockResponse(); // Resetear la respuesta antes de la nueva llamada
  
      await AlumnoControler.getAlumnoByMail(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

  });
});
