import { Router } from 'express';
import { AsesorControler } from '../controller/ControlerAsesor.js'
import { SolicitudControler } from '../controller/ControlerSolicitud.js'
import { AsesoriaControler } from '../controller/ControlerAsesoria.js'
import { authMiddleware } from '../utils/jwt/jwt.js';

const router = Router();

router.get('/asesores', authMiddleware(['asesor']), AsesorControler.getAsesorByMail);

router.patch('/asesorias', authMiddleware(['asesor']), AsesoriaControler.actualizarAsesoria);

router.get('/asesorias', authMiddleware(['asesor']), AsesoriaControler.obtenerAsesoriasPorAsesor);

router.patch('/asesores', authMiddleware(['asesor']), AsesorControler.updateAsesor);

router.delete('/asesor', authMiddleware(['asesor']), AsesorControler.deleteAsesor);

export default router;