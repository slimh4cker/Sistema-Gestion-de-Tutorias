import { Router } from 'express';
import { AsesorControler } from '../controller/ControlerAsesor.js'
import { SolicitudControler } from '../controller/ControlerSolicitud.js'
import { authMiddleware } from '../utils/jwt/jwt.js';

const router = Router();

router.get('/asesores', authMiddleware(['asesor']), AsesorControler.getAsesorByMail);

// router.post('/solicitud', authMiddleware(['asesor']), SolicitudControler.crearSolicitudDeAlumno);

router.put('/asesores', authMiddleware(['asesor']), AsesorControler.updateAsesor);

router.delete('/asesor', authMiddleware(['asesor']), AsesorControler.deleteAsesor);

export default router;