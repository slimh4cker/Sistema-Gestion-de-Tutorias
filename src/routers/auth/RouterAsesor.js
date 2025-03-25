const express = require('express');
const router = express.Router();
const { registroAsesor, getSessionAsesor } = require('../../controllers/authController');
const { validarRegistroAsesor } = require('../../middlewares/validators');
const { verifyToken, requireRole } = require('../../middlewares/auth');

// Registrar nuevo asesor
router.post('/', validarRegistroAsesor, registroAsesor);

// Obtener sesión del asesor (protegida)
router.get('/', 
  verifyToken, 
  requireRole('asesor'), 
  getSessionAsesor
);

module.exports = router;