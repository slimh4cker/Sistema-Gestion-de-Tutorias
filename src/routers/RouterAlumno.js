import { Router } from 'express';
import { AlumnoControler } from '../controller/ControlerAlumno.js'
import { SolicitudControler } from '../controller/ControlerSolicitud.js'
import { authMiddleware } from '../utils/jwt/jwt.js';

const router = Router();

router.get('/alumno', authMiddleware(['alumno']), AlumnoControler.getAlumnoByMail);
router.post('/alumno/solicitud', SolicitudControler.crearSolicitudDeAlumno)
router.post('/alumno')

export default router;