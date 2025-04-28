import { Router } from 'express';
import { getAlumnoByMail, getSolicitudesPorEstado } from '../../controller/auth/estudianteAuth';

const router = Router();

router.get('/alumno/alumno', getAlumnoByMail);
router.get('/alumno/solicitud', getSolicitudesPorEstado)
router.post('/alumno')

export default router;