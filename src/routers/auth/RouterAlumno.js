import express from 'express';
import { registrarEstudiante, loginEstudiante } from '../controllers/auth/estudianteAuth.js';

const router = express.Router();

router.post('/registrar', registrarEstudiante);
router.post('/login', loginEstudiante);

export default router;