// Validaciones de datos

const { body } = require('express-validator');

// Validaciones comunes
const validacionesBase = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 12 })
];

// Alumno
const validarAlumno = [
  ...validacionesBase,
  body('nombre').trim().notEmpty(),
  body('curso').trim().notEmpty(),
  body('matricula').isAlphanumeric().isLength({ min: 8 })
];

// Asesor
const validarAsesor = [
  ...validacionesBase,
  body('nombre').trim().notEmpty(),
  body('especialidad').trim().notEmpty()
];

// Administrador
const validarAdministrador = [
  ...validacionesBase,
  body('nombre').trim().notEmpty()
];

module.exports = {
  validarAlumno,
  validarAsesor,
  validarAdministrador
};