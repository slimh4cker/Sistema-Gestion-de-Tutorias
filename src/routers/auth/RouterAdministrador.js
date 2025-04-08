import express from 'express';
import { AdminControler } from '../../controller/ControlerAdministrador.js';
import { verificarToken, requiereRol } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// Obtener los datos del administrador por correo (requiere autenticación)
router.get('/admin', verificarToken, requiereRol('administrador'), AdminControler.getAdminByMail);

// Crear un nuevo administrador (requiere autenticación y rol de administrador)
router.post('/admin', verificarToken, requiereRol('administrador'), AdminControler.createAdmin);

// Actualizar datos de un administrador (requiere autenticación y rol de administrador)
router.put('/admin', verificarToken, requiereRol('administrador'), AdminControler.updateAdmin);

// Eliminar un administrador (requiere autenticación y rol de administrador)
router.delete('/admin', verificarToken, requiereRol('administrador'), AdminControler.deleteAdmin);

export default router;
