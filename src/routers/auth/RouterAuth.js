import { Router } from 'express';
import {loginEstudiante, registrarEstudiante} from '../../controller/auth/estudianteAuth.js';
import {loginAsesor} from '../../controller/auth/asesorAuth.js';
import {loginAdmin} from '../../controller/auth/administradorAuth.js';
import { authMiddleware } from '../../utils/jwt/jwt.js';
import { registrarAdmin } from '../../controller/auth/administradorAuth.js';
import { registrarAsesor } from '../../controller/auth/asesorAuth.js';

const router = Router();

// Login routes
router.post('/auth/alumno', loginEstudiante);
router.post('/auth/asesor', loginAsesor);
router.post('/auth/admin', loginAdmin);

// Register routes
router.post('/admin',
  authMiddleware(['administrador']),
  registrarAdmin
);
router.post('/alumno', registrarEstudiante);
router.post('/asesor', registrarAsesor);

export default router;
