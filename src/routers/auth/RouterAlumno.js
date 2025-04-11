import { Router } from 'express';
import { registrarEstudiante, loginEstudiante } from '../controllers/estudianteController.js';
import { authMiddleware } from '../utils/jwt/jwt.js';

const router = Router();

// Registro público
router.post('/registrar', registrarEstudiante);

// Login público
router.post('/login', loginEstudiante);

// Ruta protegida para estudiantes
router.get('/perfil',
  authMiddleware(['estudiante']),
  (req, res) => {
    res.json({
      message: `Bienvenido ${req.user.nombre}`,
      matricula: req.user.matricula,
      cursos_inscritos: [] // Ejemplo de datos adicionales
    });
  }
);

export default router;