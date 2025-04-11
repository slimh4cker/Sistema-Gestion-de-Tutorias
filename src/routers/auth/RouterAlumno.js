import { Router } from 'express';
import { registrarEstudiante } from '../../controller/auth/estudianteAuth';

const router = Router();

// Registro público de alumnos
router.post('/alumno', registrarEstudiante);

export default router;