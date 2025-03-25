// routers/auth/authRouter.js
import express from 'express';
import alumnoRouter from './alumnoRouter.js';
import asesorRouter from './asesorRouter.js';
import administradorRouter from './administradorRouter.js';

const authRouter = express.Router();

// Middleware para todas las rutas /sesion
authRouter.use((req, res, next) => {
  console.log(`Acceso a sesión: ${req.method} ${req.originalUrl}`);
  next();
});

// Delegar a routers específicos
authRouter.use('/alumno', alumnoRouter);
authRouter.use('/asesor', asesorRouter);
authRouter.use('/administrador', administradorRouter);

export default authRouter;