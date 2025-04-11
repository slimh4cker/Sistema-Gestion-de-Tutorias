import { Router } from 'express';
import { 
  registrarAdmin,
  loginAdmin
} from '../controllers/adminController.js';
import { authMiddleware } from '../utils/jwt/jwt.js';

const router = Router();

// Solo admins pueden registrar nuevos admins
router.post('/registrar', 
  authMiddleware(['admin']), 
  registrarAdmin
);

router.post('/login', loginAdmin);

// Ruta protegida para admins
router.get('/sistema',
  authMiddleware(['admin']),
  (req, res) => {
    res.json({
      message: `Bienvenido ${req.user.nombre}`,
      sistema: process.env.SISTEMA
    });
  }
);

export default router;