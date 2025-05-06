import { Router } from 'express';
import { AdminControler } from '../controller/ControlerAdministrador.js'
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

router.get('/solicitud', authMiddleware(['administrador']), SolicitudControler.getTodasLasSolicitudes);

router.patch('/admin', authMiddleware(['administrador']), AdminControler.updateAdmin);
router.patch('/solicitud', authMiddleware(['administrador']), SolicitudControler.cambiarEstadoSolicitud);

router.delete('/admin', authMiddleware(['administrador']), AdminControler.deleteAdmin);


export default router;