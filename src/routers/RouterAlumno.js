import { Router } from 'express';
import { AlumnoControler } from '../controller/ControlerAlumno.js'
import { SolicitudControler } from '../controller/ControlerSolicitud.js'
import { AsesoriaControler } from '../controller/ControlerAsesoria.js'
import { authMiddleware } from '../utils/jwt/jwt.js';

const router = Router();

router.get('/alumno', authMiddleware(['alumno']), AlumnoControler.getAlumnoByMail);

// Ruta: POST /alumno/solicitud 
router.post('/solicitud', authMiddleware(['alumno']), SolicitudControler.crearSolicitudDeAlumno);

router.get('/cursos', authMiddleware(['alumno']), AsesoriaControler.obtenerCursosAlumno)

// Ruta: GET /alumno/solicitud?estado=asignada (nueva funcionalidad)
router.get('/solicitud', authMiddleware(['alumno']), SolicitudControler.getSolicitudesFiltradas);

router.patch('/alumno', authMiddleware(['alumno']), AlumnoControler.updateAlumno);

router.delete('/alumno', authMiddleware(['alumno']), AlumnoControler.deleteAlumno);

export default router;