<<<<<<< HEAD
// pruebas de los metodos del asesor
import { verify } from "jsonwebtoken";
import { AsesorControler } from "../../src/controller/ControlerAsesor.js"
import { describe, jest } from '@jest/globals';

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

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn.mockReturnValue({ email: 'juan@example.com' })
}));

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
        {}, {}, {}, {email: 'pedro@example.com'}
      )
    })
    it('no obtener nada del correo', async () => {
      req = mockRequest(
        {}, {}, {}, {email: 'no@existo.com'}
      )
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
=======
import { jest } from '@jest/globals';
import { AsesorControler } from '../../src/controller/ControlerAsesor.js';
import { validarAsesor, validarParcialAsesor } from '../../src/schemas/users/asesor.js';

// Mocks
jest.mock('../../src/models/AmazonRDS/AsesorModel.js', () => ({
  AsesorModel: {
    getAsesorByMail: jest.fn(),
    createAsesor: jest.fn(),
    updateAsesor: jest.fn(),
    deleteAsesor: jest.fn()
  }
}));

jest.mock('../../src/schemas/users/asesor.js', () => ({
  validarAsesor: jest.fn(),
  validarParcialAsesor: jest.fn()
}));

jest.mock('../../src/utils/request.js', () => ({
  obtenerMailDeReq: jest.fn().mockReturnValue('asesor@test.com')
}));

describe('AsesorControler', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      body: {},
      params: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAsesorByMail', () => {
    it('debería retornar 200 con datos del asesor', async () => {
      const mockData = { email: 'asesor@test.com', nombre: 'Asesor Test' };
      AsesorModel.getAsesorByMail.mockResolvedValue(mockData);

      await AsesorControler.getAsesorByMail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('debería retornar 404 si no encuentra el asesor', async () => {
      AsesorModel.getAsesorByMail.mockResolvedValue(null);

      await AsesorControler.getAsesorByMail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('debería manejar errores internos', async () => {
      AsesorModel.getAsesorByMail.mockRejectedValue(new Error('DB Error'));

      await AsesorControler.getAsesorByMail(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('createAsesor', () => {
    it('debería crear asesor exitosamente', async () => {
      req.body = { email: 'nuevo@asesor.com', password: 'ValidPass123!' };
      validarAsesor.mockReturnValue({ success: true });
      AsesorModel.getAsesorByMail.mockResolvedValue(null);
      AsesorModel.createAsesor.mockResolvedValue(true);

      await AsesorControler.createAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Asesor creado correctamente' });
    });

    it('debería fallar con datos inválidos', async () => {
      req.body = { email: 'invalid' };
      validarAsesor.mockReturnValue({ 
        success: false, 
        error: { message: JSON.stringify({ error: 'Email inválido' }) }
      });

      await AsesorControler.createAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('debería fallar si el correo ya existe', async () => {
      req.body = { email: 'existente@asesor.com' };
      validarAsesor.mockReturnValue({ success: true });
      AsesorModel.getAsesorByMail.mockResolvedValue({});

      await AsesorControler.createAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('updateAsesor', () => {
    it('debería actualizar asesor exitosamente', async () => {
      req.body = { nombre: 'Nuevo Nombre' };
      validarParcialAsesor.mockReturnValue({ success: true });
      AsesorModel.updateAsesor.mockResolvedValue(true);

      await AsesorControler.updateAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('debería fallar con datos inválidos', async () => {
      req.body = { email: 'formato-invalido' };
      validarParcialAsesor.mockReturnValue({ success: false });

      await AsesorControler.updateAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('debería manejar errores de actualización', async () => {
      req.body = { nombre: 'Nuevo' };
      validarParcialAsesor.mockReturnValue({ success: true });
      AsesorModel.updateAsesor.mockRejectedValue(new Error('DB Error'));

      await AsesorControler.updateAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteAsesor', () => {
    it('debería eliminar asesor exitosamente', async () => {
      AsesorModel.getAsesorByMail.mockResolvedValue({});
      AsesorModel.deleteAsesor.mockResolvedValue(true);

      await AsesorControler.deleteAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('debería fallar si el asesor no existe', async () => {
      AsesorModel.getAsesorByMail.mockResolvedValue(null);

      await AsesorControler.deleteAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('debería manejar errores de eliminación', async () => {
      AsesorModel.getAsesorByMail.mockResolvedValue({});
      AsesorModel.deleteAsesor.mockRejectedValue(new Error('DB Error'));

      await AsesorControler.deleteAsesor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
>>>>>>> ee8c2f1a409519fa3400e93ef79d79c5f14cdc9f
