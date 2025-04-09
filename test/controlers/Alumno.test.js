// pruebas de los metodos de alumno
// Import de los controlers
//import { AlumnoControler } from "../../src/controller/ControlerAlumno.js"
import { jest } from '@jest/globals';
import { emailAtributo } from '../../src/schemas/users/commons.js';


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

  describe('registrarEstudiante y eliminar', () => {
    it('debería registrar un nuevo estudiante correctamente', async () => {
      const alumno = {
        nombre: 'Melissa',
        email: 'melicha@correo.temp',
        password: 'Password123!'
      }

      req = mockRequest(alumno, {}, {}, {});

      // Crear el alumno
      await AlumnoControler.createAlumno(req, res);
      expect(res.status).toHaveBeenCalledWith(201);

      // Verificar que el alumno fue creado correctamente
      req = await mockRequest(alumno, {}, {}, {email: alumno.email})
      res = await mockResponse(); // Resetear la respuesta antes de la nueva llamada

      await AlumnoControler.getAlumnoByMail(req, res);
      expect(res.status).toHaveBeenCalledWith(200);

      // eliminar este alumno
      await AlumnoControler.deleteAlumno(req, res);
      expect(res.status).toHaveBeenCalledWith(200);

      await AlumnoControler.getAlumnoByMail(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
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
      const datosAactualizar = {
        nombre: 'Laura Actualizado',
        email: 'laura@lijeramente.actualizado'
      }
      const datosOriginales = {
        nombre: 'Laura Fernández',
        email: 'laura@estudiante.com'
      }

      const correoOriginal = 'laura@estudiante.com'

      req = mockRequest(
        { nombre: 'Laura Actualizado',
          email: 'laura@lijeramente.actualizado' },
        { },
        { },
        { email: correoOriginal }
      );

      await AlumnoControler.updateAlumno(req, res);

      expect(res.status).toHaveBeenCalledWith(200);

      req = mockRequest({}, {}, {}, {email: datosAactualizar.email} );
      res = mockResponse(); // Resetear la respuesta antes de la nueva llamada

      // volver a buscar en la base de datos
      await AlumnoControler.getAlumnoByMail(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        nombre: datosAactualizar.nombre
      }));

      // retornar a como estaba
      req = mockRequest(
        { 
          nombre: 'Laura Fernández',
          email: 'laura@estudiante.com' },
        { },
        { },
        { email: datosAactualizar.email}
      );

      await AlumnoControler.updateAlumno(req, res);
    });

  });

});
