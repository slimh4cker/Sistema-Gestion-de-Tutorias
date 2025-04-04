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