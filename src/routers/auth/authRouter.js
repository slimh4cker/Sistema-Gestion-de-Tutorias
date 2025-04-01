import express from 'express';
import alumnoRouter from './RouterAlumno.js';
import asesorRouter from './RouterAsesor.js';
import administradorRouter from './RouterAdministrador.js';

const authRouter = express.Router();

// Middleware global para todas las rutas de auth
authRouter.use((req, res, next) => {
  console.log(`Acceso a sesión: ${req.method} ${req.originalUrl}`);
  next();
});

// Delegar rutas a cada rol
authRouter.use('/alumno', alumnoRouter);
authRouter.use('/asesor', asesorRouter);
authRouter.use('/administrador', administradorRouter);

export default authRouter;