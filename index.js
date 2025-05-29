import express from 'express';
import cors from 'cors';
import RouterAuth from './src/routers/auth/RouterAuth.js'
import RouterAlumno from './src/routers/RouterAlumno.js'
import RouterAsesor from './src/routers/RouterAsesor.js'
import RouterAdmininistrador from './src/routers/RouterAdministrador.js'
import RouterMensajes from './src/routers/RouterMensajes.js'

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");

  // Middlewares
  app.use(express.json());
  app.use(cors());

  // Enrutadores
  app.use('/', RouterAuth);
  app.use('/alumno', RouterAlumno);
  app.use('/asesores', RouterAsesor);
  app.use('/admin', RouterAdmininistrador);
  app.use('/mensajes', RouterMensajes)

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

