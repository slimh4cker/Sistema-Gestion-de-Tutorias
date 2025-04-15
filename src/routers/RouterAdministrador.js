import { Router } from 'express';
import { authMiddleware } from '../utils/jwt/jwt.js';
import { registrarAdmin } from '../../controller/auth/administradorAuth.js';

const router = Router();

// Registro protegido
router.post('/administrador',
  authMiddleware(['administrador']),
  registrarAdmin
);

export default router;