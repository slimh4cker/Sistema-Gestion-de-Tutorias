import { Router } from 'express';
import { getAlumnoByMail } from '../../controller/auth/estudianteAuth';

const router = Router();

router.get('/alumno/alumno', getAlumnoByMail);

export default router;