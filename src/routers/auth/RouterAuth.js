import { Router } from 'express';
import {loginEstudiante} from '../../controller/auth/estudianteAuth.js';
import {loginAsesor} from '../../controller/auth/asesorAuth.js';
import {loginAdmin} from '../../controller/auth/administradorAuth.js';

const router = Router();

router.get('/auth/alumno', loginEstudiante);
router.get('/auth/asesor', loginAsesor);
router.get('/auth/administrador', loginAdmin);

export default router;