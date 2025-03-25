// routes/auth/asesores.js
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
    body('speciality').trim().notEmpty(),
    validators.validateEmail,
    validators.validatePassword
  ],
  authController.registerAsesor
);

// Obtener sesión
router.get(
  '/',
  authMiddleware.verifyToken,
  authMiddleware.requireRole('asesor'),
  authController.getAsesorSession
);

module.exports = router;