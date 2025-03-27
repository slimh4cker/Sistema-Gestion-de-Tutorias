import express from 'express';
import { AlumnoControler } from '../controllers/AlumnoController';
import { verificarToken, requiereRol } from '../src/middlewares/auth';

const router = express.Router();

// Obtener los datos del alumno por correo (requiere autenticación)
router.get('/alumno', verificarToken, AlumnoControler.getAlumnoByMail);

// Crear un nuevo alumno (requiere autenticación y rol de administrador)
router.post('/alumno', verificarToken, requiereRol('administrador'), AlumnoControler.createAlumno);

// Actualizar los datos del alumno (requiere autenticación)
router.put('/alumno', verificarToken, AlumnoControler.updateAlumno);

// Eliminar un alumno (requiere autenticación y rol de administrador)
router.delete('/alumno', verificarToken, requiereRol('administrador'), AlumnoControler.deleteAlumno);

export default router;
