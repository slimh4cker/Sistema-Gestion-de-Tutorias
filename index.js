import express from 'express';
import cors from 'cors';
import RouterAuth from './src/routers/auth/RouterAuth.js'
import RouterAlumno from './src/routers/RouterAlumno.js'

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");

  // Middlewares
  app.use(express.json());
  app.use(cors());

  // Enrutadores
  app.use('/', RouterAuth);
  app.use('/alumno', RouterAlumno);

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

