import express from 'express';
<<<<<<< HEAD
import { AlumnoControler } from '../../controller/ControlerAlumno.js'
import { verificarToken, requiereRol } from '../../middlewares/auth.js';
=======
import { AlumnoControler } from '../../controller/ControlerAlumno.js';
import { verificarToken, requiereRol } from '../../../src/middlewares/auth.js';
>>>>>>> 6222131a63d6eec85603b457ba07120a71806e2b

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
