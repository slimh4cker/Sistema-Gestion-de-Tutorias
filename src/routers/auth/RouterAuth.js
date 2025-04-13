import { Router } from 'express';
import {loginEstudiante} from '../../controller/auth/estudianteAuth.js';
import {loginAsesor} from '../../controller/auth/asesorAuth.js';
import {loginAdmin} from '../../controller/auth/administradorAuth.js';

const router = Router();

router.post('/auth/alumno', loginEstudiante);
router.post('/auth/asesor', loginAsesor);
router.post('/auth/administrador', loginAdmin);

export default router;
