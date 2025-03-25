// 24-03-2025
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../../controllers/authController');
const validators = require('../../middlewares/validators');
const authMiddleware = require('../../middlewares/auth');

// Registro
router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('course').trim().notEmpty(),
    body('matricula').isAlphanumeric(),
    validators.validateEmail,
    validators.validatePassword
  ],
  authController.registerAlumno
);

// Obtener sesión
router.get(
  '/',
  authMiddleware.verifyToken,
  authMiddleware.requireRole('alumno'),
  authController.getAlumnoSession
);

module.exports = router;