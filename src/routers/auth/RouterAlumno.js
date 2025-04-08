import express from 'express';
import { AlumnoControler } from '../../controller/ControlerAlumno.js';
import { verificarToken, requiereRol } from '../../../src/middlewares/authMiddleware.js';

const routerAlumno = express.Router();

// Obtener los datos del alumno por correo (requiere autenticación)
routerAlumno.get('/alumno', verificarToken, AlumnoControler.getAlumnoByMail);

// Crear un nuevo alumno (requiere autenticación y rol de administrador)
routerAlumno.post('/alumno', verificarToken, requiereRol('administrador'), AlumnoControler.createAlumno);

// Actualizar los datos del alumno (requiere autenticación)
routerAlumno.put('/alumno', verificarToken, AlumnoControler.updateAlumno);

// Eliminar un alumno (requiere autenticación y rol de administrador)
routerAlumno.delete('/alumno', verificarToken, requiereRol('administrador'), AlumnoControler.deleteAlumno);

export default routerAlumno;
