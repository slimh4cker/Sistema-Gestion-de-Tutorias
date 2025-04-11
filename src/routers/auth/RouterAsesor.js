import express from 'express';
import { registrarAsesor, loginAsesor } from '../controllers/asesorController.js';
import { authMiddleware } from '../utils/jwt/jwt.js';

const router = express.Router();

// Registrar asesor
router.post('/registrar',
  registrarAsesor
);

// Login público para asesores
router.post('/login', loginAsesor);

// Ruta protegida para asesores
router.get('/perfil',
  authMiddleware(['asesor']),
  (req, res) => {
    res.json({
      nombre: req.user.nombre,
      especializacion: req.user.area_especializacion,
    });
  }
);

export default router;