import { jest } from '@jest/globals';
import { AdminControler } from '../../src/controller/ControlerAdministrador.js';
import { validarAdmin, validarParcialAdmin } from '../../src/schemas/users/admin.js';

// Mocks
jest.mock('../../src/models/AmazonRDS/AdminModel.js', () => ({
  AdminModel: {
    getAdminByMail: jest.fn(),
    createAdmin: jest.fn(),
    updateAdmin: jest.fn(),
    deleteAdmin: jest.fn()
  }
}));

jest.mock('../../src/schemas/users/admin.js', () => ({
  validarAdmin: jest.fn(),
  validarParcialAdmin: jest.fn()
}));

jest.mock('../../src/utils/request.js', () => ({
  obtenerMailDeReq: jest.fn().mockReturnValue('admin@test.com')
}));

describe('AdminControler', () => {
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

  describe('getAdminByMail', () => {
    it('debería retornar 200 con datos del admin', async () => {
      const mockData = { email: 'admin@test.com', nombre: 'Admin Test' };
      AdminModel.getAdminByMail.mockResolvedValue(mockData);

      await AdminControler.getAdminByMail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('debería retornar 404 si no encuentra el admin', async () => {
      AdminModel.getAdminByMail.mockResolvedValue(null);

      await AdminControler.getAdminByMail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('debería manejar errores internos', async () => {
      AdminModel.getAdminByMail.mockRejectedValue(new Error('DB Error'));

      await AdminControler.getAdminByMail(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('createAdmin', () => {
    it('debería crear admin exitosamente', async () => {
      req.body = { email: 'new@admin.com', password: 'ValidPass123!' };
      validarAdmin.mockReturnValue({ success: true });
      AdminModel.getAdminByMail.mockResolvedValue(null);
      AdminModel.createAdmin.mockResolvedValue(true);

      await AdminControler.createAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería fallar con datos inválidos', async () => {
      req.body = { email: 'invalid' };
      validarAdmin.mockReturnValue({ 
        success: false, 
        error: { message: JSON.stringify({ error: 'Email inválido' }) }
      });

      await AdminControler.createAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('debería fallar si el correo ya existe', async () => {
      req.body = { email: 'existing@admin.com' };
      validarAdmin.mockReturnValue({ success: true });
      AdminModel.getAdminByMail.mockResolvedValue({});

      await AdminControler.createAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('updateAdmin', () => {
    it('debería actualizar admin exitosamente', async () => {
      req.body = { nombre: 'Nuevo Nombre' };
      validarParcialAdmin.mockReturnValue({ success: true });
      AdminModel.updateAdmin.mockResolvedValue(true);

      await AdminControler.updateAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('debería fallar al actualizar correo existente', async () => {
      req.body = { email: 'existing@admin.com' };
      validarParcialAdmin.mockReturnValue({ success: true });
      AdminModel.getAdminByMail.mockResolvedValue({});

      await AdminControler.updateAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('debería manejar validación fallida', async () => {
      validarParcialAdmin.mockReturnValue({ success: false });

      await AdminControler.updateAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('deleteAdmin', () => {
    it('debería eliminar admin exitosamente', async () => {
      AdminModel.getAdminByMail.mockResolvedValue({});
      AdminModel.deleteAdmin.mockResolvedValue(true);

      await AdminControler.deleteAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('debería fallar si el admin no existe', async () => {
      AdminModel.getAdminByMail.mockResolvedValue(null);

      await AdminControler.deleteAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('debería manejar errores de eliminación', async () => {
      AdminModel.getAdminByMail.mockResolvedValue({});
      AdminModel.deleteAdmin.mockRejectedValue(new Error('DB Error'));

      await AdminControler.deleteAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});