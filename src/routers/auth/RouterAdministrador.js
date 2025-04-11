import express from 'express';
import { registrarAdmin, loginAdmin } from '../controllers/adminController.js';
import { authMiddleware } from '../utils/jwt/jwt.js';

const router = express.Router();

// Registrar nuevo admin (solo por otros admins)
router.post('/registrar', 
  authMiddleware(['admin']),
  registrarAdmin
);

// Login público para admins
router.post('/login', loginAdmin);

// Ruta protegida de ejemplo
router.get('/dashboard',
  authMiddleware(['admin']),
  (req, res) => {
    res.json({
      message: `Bienvenido admin ${req.user.nombre}`,
      sistema: 'Panel de control administrativo'
    });
  }
);

export default router;