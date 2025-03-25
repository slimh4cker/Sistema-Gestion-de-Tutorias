const express = require('express');
const router = express.Router();
const { registroAdministrador, getSessionAdministrador } = require('../../controllers/authController');
const { validarRegistroAdministrador } = require('../../middlewares/validators');
const { verifyToken, requireRole } = require('../../middlewares/auth');

// Registrar nuevo administrador
router.post('/', validarRegistroAdministrador, registroAdministrador);

// Obtener sesión del administrador (protegida)
router.get('/', 
  verifyToken, 
  requireRole('administrador'), 
  getSessionAdministrador
);

module.exports = router;