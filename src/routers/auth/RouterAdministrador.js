// routes/auth/administradores.js
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
    body('num_employee').isNumeric(),
    validators.validateEmail,
    validators.validatePassword
  ],
  authController.registerAdministrador
);

// Obtener sesión
router.get(
  '/',
  authMiddleware.verifyToken,
  authMiddleware.requireRole('administrador'),
  authController.getAdminSession
);

module.exports = router;