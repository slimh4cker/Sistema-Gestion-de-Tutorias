import { Router } from 'express';
import { getAlumnoByMail } from '../models/AmazonRDS/AlumnoModel';
import { crearSolicitudDeAlumno } from '../controller/ControlerSolicitud'

const router = Router();

router.get('/alumno/alumno', getAlumnoByMail);
router.post('/alumno/solicitud', crearSolicitudDeAlumno)
router.post('/alumno')

export default router;