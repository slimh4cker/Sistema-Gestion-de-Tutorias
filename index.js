import express from 'express';
import cors from 'cors';
import { authRouter } from './src/routers/auth/authRouter.js';
import { routerAlumno } from './src/routers/auth/RouterAlumno.js';
import { routerAsesor } from './src/routers/auth/RouterAsesor.js';

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");

  // Middlewares
  app.use(express.json());
  app.use(cors());

  // Enrutadores
  app.use('/auth', authRouter);
  app.use('/alumno', routerAlumno);
  app.use('/asesor', routerAsesor);

  // Ruta de prueba básica
  app.get('/', (req, res) => {
    res.send('¡API funcionando correctamente!');
  });

  // Manejo de rutas no existentes (404)
  app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
  });

  const PORT = process.env.PORT || 1234;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

createApp();

