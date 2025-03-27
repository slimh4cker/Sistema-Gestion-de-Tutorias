// routers/auth/authRouter.js
import express from 'express';
import alumnoRouter from './RouterAlumno.js';
import asesorRouter from './RouterAsesor.js';
import administradorRouter from './RouterAdministrador.js';

const authRouter = express.Router();

// Middleware para todas las rutas /sesion
authRouter.use((req, res, next) => {
  console.log("acceso a servicios de sesion")
  console.log(`Acceso a sesión: ${req.method} ${req.originalUrl}`);
  next();
});

// Delegar a routers específicos
authRouter.use('/alumno', alumnoRouter);
authRouter.use('/asesor', asesorRouter);
authRouter.use('/administrador', administradorRouter);

export default authRouter;