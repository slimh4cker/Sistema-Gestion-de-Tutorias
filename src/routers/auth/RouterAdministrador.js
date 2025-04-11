import express from 'express';
import { AdminControler } from '../../controller/ControlerAdministrador.js';

const router = express.Router();

// Obtener los datos del administrador por correo (requiere autenticación)
router.get('/', verificarToken, requiereRol('administrador'), AdminControler.getAdminByMail);

// Crear un nuevo administrador (requiere autenticación y rol de administrador)
router.post('/', verificarToken, requiereRol('administrador'), AdminControler.createAdmin);

// Actualizar datos de un administrador (requiere autenticación y rol de administrador)
router.put('/', verificarToken, requiereRol('administrador'), AdminControler.updateAdmin);

// Eliminar un administrador (requiere autenticación y rol de administrador)
router.delete('/', verificarToken, requiereRol('administrador'), AdminControler.deleteAdmin);

export default router;
