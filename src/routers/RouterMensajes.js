import { Router } from "express";
import { MensajeControler } from "../controller/ControlerMensajes.js";
import { authMiddleware } from "../utils/jwt/jwt.js";
const router = Router();

// Ruta para crear un nuevo mensaje
router.post('/crear', authMiddleware(['alumno', 'asesor']), MensajeControler.crearMensaje);

// Ruta para obtener los chats de una usuario
router.get('/chats', authMiddleware(['alumno', 'asesor']), MensajeControler.obtenerChats);

// Ruta para obtener los mensajes de una asesoria
router.post('/mensajes', authMiddleware(['alumno', 'asesor']), MensajeControler.obtenerMensajes);

// Ruta para cambiar el estado de los mensajes
router.put('/estado', authMiddleware(['alumno', 'asesor']), MensajeControler.actualizarEstadoMensaje);

export default router