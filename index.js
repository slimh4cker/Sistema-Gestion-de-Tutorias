import express, { json } from 'express';


export const createApp = () => {
  const app = express();

  app.disable("x-powered-by"); //Ocultar la cabecera de express

  // Poner aqui middlewares

  // Enrutadores aqui


  //  configuracion de puerto
  const PORT = process.env.PORT || 1234; // puerto default 1234

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

createApp();

