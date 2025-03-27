import express from 'express';
import routerAsesor from './src/routers/auth/RouterAsesor.js'; // Ruta al archivo RouterAsesor.js

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");

  // Middlewares aquí
  app.use(express.json()); // Asegúrate de tener esta línea para procesar JSON en las solicitudes

  // Enrutadores aquí
  app.use('/api', routerAsesor);

  // Configuración de puerto
  const PORT = process.env.PORT || 1234; // Puerto default 1234

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

createApp();
