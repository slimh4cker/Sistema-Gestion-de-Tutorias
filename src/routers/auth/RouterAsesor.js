import express from 'express';
<<<<<<< HEAD
import { AsesorControler } from '../../controller/ControlerAsesor.js';
import { verificarToken, requiereRol } from '../../middlewares/auth.js';
=======
import { AsesorControler } from '../../../src/controller/ControlerAsesor.js';
import { verificarToken, requiereRol } from '../../../src/middlewares/auth.js';
>>>>>>> 6222131a63d6eec85603b457ba07120a71806e2b

const router = express.Router();

// Obtener los datos del asesor por correo (requiere autenticación)
router.get('/asesor', verificarToken, AsesorControler.getAsesorByMail);

// Crear un nuevo asesor (requiere autenticación y rol de administrador)
router.post('/asesor', verificarToken, requiereRol('administrador'), AsesorControler.createAsesor);

// Actualizar los datos del asesor (requiere autenticación)
router.put('/asesor', verificarToken, AsesorControler.updateAsesor);

// Eliminar un asesor (requiere autenticación y rol de administrador)
router.delete('/asesor', verificarToken, requiereRol('administrador'), AsesorControler.deleteAsesor);

export default router;
