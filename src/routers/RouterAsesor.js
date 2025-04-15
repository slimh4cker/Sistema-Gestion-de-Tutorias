import { Router } from 'express';
import { registrarAsesor } from '../../controller/auth/asesorAuth.js';

const router = Router();

// Registro público de asesores
router.post('/asesor', registrarAsesor);

export default router;