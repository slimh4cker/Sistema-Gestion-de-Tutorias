import { Router } from 'express';
import { AdminControler } from '../controller/ControlerAdministrador.js'
import { AsesorControler } from '../controller/ControlerAsesor.js'
import { SolicitudControler } from '../controller/ControlerSolicitud.js'
import { authMiddleware } from '../utils/jwt/jwt.js';
import { registrarAdmin } from '../controller/auth/administradorAuth.js';

const router = Router();

// Registro protegido
router.post('/admin',
  authMiddleware(['administrador']),
  registrarAdmin
);

router.get('/admin', authMiddleware(['administrador']), AdminControler.getAdminByMail);
router.get('/asesores', authMiddleware(['administrador']), AsesorControler.getAllAsesores);
router.get('/solicitud', authMiddleware(['administrador']), SolicitudControler.getTodasLasSolicitudes);

router.patch('/admin', authMiddleware(['administrador']), AdminControler.updateAdmin);
router.patch('/solicitud', authMiddleware(['administrador']), SolicitudControler.cambiarEstadoSolicitud);

router.delete('/admin', authMiddleware(['administrador']), AdminControler.deleteAdmin);
router.patch('/asesores', authMiddleware(['administrador']), AsesorControler.deleteAsesor);


export default router;