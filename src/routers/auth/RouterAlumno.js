const express = require('express');
const router = express.Router();
const { registroAlumno, getSessionAlumno } = require('../../controllers/authController');
const { validarRegistroAlumno } = require('../../middlewares/validators');
const { verifyToken, requireRole } = require('../../middlewares/auth');

// Registrar nuevo alumno
router.post('/', validarRegistroAlumno, registroAlumno);

// Obtener sesión del alumno (protegida)
router.get('/', 
  verifyToken, 
  requireRole('alumno'), 
  getSessionAlumno
);

module.exports = router;