import express from 'express';
import { AsesorControler } from '../../../src/controller/ControlerAsesor.js';
import { verificarToken, requiereRol } from '../../../src/middlewares/authMiddleware.js';

export const routerAsesor = express.Router();

// Obtener los datos del asesor por correo (requiere autenticación)
routerAsesor.get('/', verificarToken, AsesorControler.getAsesorByMail);

// Crear un nuevo asesor (requiere autenticación y rol de administrador)
routerAsesor.post('/', AsesorControler.createAsesor);

// Actualizar los datos del asesor (requiere autenticación)
routerAsesor.put('/', verificarToken, AsesorControler.updateAsesor);

// Eliminar un asesor (requiere autenticación y rol de administrador)
routerAsesor.delete('/', verificarToken, requiereRol('administrador'), AsesorControler.deleteAsesor);

export default routerAsesor;
