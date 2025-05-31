-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-05-2025 a las 20:15:21
-- Versión del servidor: 11.5.2-MariaDB
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `asesorias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

DROP TABLE IF EXISTS `administradores`;
CREATE TABLE IF NOT EXISTS `administradores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `email`, `password`, `estado`) VALUES
(1, 'Juan Pérez', 'juan@admin.com', '$2b$10$90zn9PsWflmTK8XxrbnzRekfLOwQerM/ktJctA4CP2meTZaAW1ZjK', 'activo'),
(2, 'Maria Tomez Perez', 'maria@asesor.io', 'myPassword33', 'activo'),
(3, 'Maria Tomez 2', 'Maria@hotmail.com', 'myPassword33', 'activo'),
(6, 'Maria Tomez Aguilar', 'maria@admin.org', 'myPassword33', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesores`
--

DROP TABLE IF EXISTS `asesores`;
CREATE TABLE IF NOT EXISTS `asesores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `area_especializacion` varchar(255) DEFAULT NULL,
  `disponibilidad` varchar(400) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `asesores`
--

INSERT INTO `asesores` (`id`, `nombre`, `email`, `password`, `area_especializacion`, `disponibilidad`, `estado`) VALUES
(1, 'Carlos Torres', 'carlos@asesor.com', 'asesor123', 'Matemáticas', 'Lunes-Viernes', 'inactivo'),
(2, 'Ana López', 'ana@asesor.com', 'asesor456', 'Física', 'Martes y Jueves', 'activo'),
(5, 'Carlos Ramírez Carlos', 'carlos.ramirez@example.com', '$2b$10$JI.TZPLB3zj2.3TaUxtJa.Abii2Yf9ZYDzMLRNu/kK/NwuekBcLea', 'Matemáticas Avanzadas', 'Lunes a Viernes de 9:00 AM a 5:00 PM', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesorias`
--

DROP TABLE IF EXISTS `asesorias`;
CREATE TABLE IF NOT EXISTS `asesorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `solicitud_id` int(11) DEFAULT NULL,
  `estado` enum('pendiente','asignada','en_progreso','terminada','aplazada') DEFAULT 'pendiente',
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_atencion` date DEFAULT NULL,
  `hora_inicial` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `total_horas` decimal(5,2) DEFAULT NULL,
  `porcentaje_cumplimiento` decimal(5,2) DEFAULT NULL,
  `requiere_sesiones` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitud_id` (`solicitud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `asesorias`
--

INSERT INTO `asesorias` (`id`, `solicitud_id`, `estado`, `fecha_creacion`, `fecha_atencion`, `hora_inicial`, `hora_final`, `total_horas`, `porcentaje_cumplimiento`, `requiere_sesiones`) VALUES
(2, 1, 'asignada', '2025-05-24 00:00:00', '2025-06-01', '12:00:00', '13:07:01', NULL, 78.00, NULL),
(4, 5, 'pendiente', '2025-05-07 20:58:05', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 6, 'pendiente', '2025-05-07 21:04:18', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 7, 'pendiente', '2025-05-07 21:04:42', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 9, 'pendiente', '2025-05-22 00:27:39', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 10, 'pendiente', '2025-05-22 00:30:05', NULL, NULL, NULL, NULL, NULL, NULL),
(22, 23, 'pendiente', '2025-05-22 13:40:25', NULL, NULL, NULL, NULL, NULL, NULL),
(23, 24, 'pendiente', '2025-05-23 00:13:43', NULL, NULL, NULL, NULL, NULL, NULL),
(24, 25, 'pendiente', '2025-05-23 00:14:24', NULL, NULL, NULL, NULL, NULL, NULL),
(25, 26, 'asignada', '2025-05-23 20:23:41', NULL, NULL, NULL, NULL, NULL, NULL),
(26, 27, 'asignada', '2025-05-23 20:24:07', NULL, NULL, NULL, NULL, NULL, NULL),
(27, 28, 'asignada', '2025-05-23 20:26:35', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calendario`
--

DROP TABLE IF EXISTS `calendario`;
CREATE TABLE IF NOT EXISTS `calendario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `solicitud_id` int(11) DEFAULT NULL,
  `fecha_sesion` datetime DEFAULT NULL,
  `evento_calendar_id` varchar(255) DEFAULT NULL,
  `recordatorio_enviado` tinyint(1) DEFAULT NULL,
  `fecha_recordatorio` datetime DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  KEY `solicitud_id` (`solicitud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `calendario`
--

INSERT INTO `calendario` (`id`, `solicitud_id`, `fecha_sesion`, `evento_calendar_id`, `recordatorio_enviado`, `fecha_recordatorio`, `estado`) VALUES
(1, 1, '2025-04-10 15:00:00', 'ABC123', 0, '2025-04-10 12:00:00', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido_apoyo`
--

DROP TABLE IF EXISTS `contenido_apoyo`;
CREATE TABLE IF NOT EXISTS `contenido_apoyo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asesor_id` int(11) DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `url_video` varchar(255) DEFAULT NULL,
  `fecha_subida` datetime DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  KEY `asesor_id` (`asesor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `contenido_apoyo`
--

INSERT INTO `contenido_apoyo` (`id`, `asesor_id`, `titulo`, `descripcion`, `url_video`, `fecha_subida`, `estado`) VALUES
(1, 1, 'Introducción a Álgebra', 'Video sobre ecuaciones básicas', 'https://video.com/algebra', '2025-03-25 10:00:00', 'activo'),
(2, 2, 'No es más que basura marina', 'Como se relacionan los seres acuaticos', 'https://www.youtube.com/watch?v=IUyozpuSUIk', '2025-03-25 21:12:12', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

DROP TABLE IF EXISTS `encuestas`;
CREATE TABLE IF NOT EXISTS `encuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asesoria_id` int(11) DEFAULT NULL,
  `link_encuesta` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  KEY `asesoria_id` (`asesoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `nombre`, `email`, `password`, `estado`) VALUES
(1, 'Luis Ramírez', 'luis@estudiante.com', 'estudiante123', 'inactivo'),
(2, 'Laura Fernández', 'laura@estudiante.com', 'estudiante456', 'activo'),
(3, 'Juan Perez', 'juan@estudiant.com', '$2b$10$ypQvqp3PD3kU5KLMReChhewAgBjlbxzYM0DlD6ErCdVd3nzT1n.m.', 'activo'),
(5, 'Diego Francisco Soto Flores', 'al22760575@ite.edu.mx', '$2b$10$oWevczze9ewyed.ZDbTGDO4JIIalajEkzGaDXp3ZWU9e8VFi53b7C', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
CREATE TABLE IF NOT EXISTS `mensajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_asesoria` int(11) NOT NULL,
  `id_emisor` int(11) NOT NULL,
  `emisor_tipo` enum('alumno','asesor') NOT NULL,
  `id_receptor` int(11) NOT NULL,
  `receptor_tipo` enum('alumno','asesor') NOT NULL,
  `contenido` text NOT NULL,
  `estado` enum('enviado','leído') NOT NULL DEFAULT 'enviado',
  `fecha_envio` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_asesoria` (`id_asesoria`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `id_asesoria`, `id_emisor`, `emisor_tipo`, `id_receptor`, `receptor_tipo`, `contenido`, `estado`, `fecha_envio`) VALUES
(1, 26, 5, 'alumno', 2, 'asesor', 'Muchas gracias asesor, estaré al pendiente de ello, gracias', 'leído', '2025-05-29 00:08:37'),
(4, 26, 2, 'asesor', 5, 'alumno', 'De nada, para eso estamos', 'leído', '2025-05-29 00:10:53'),
(6, 27, 5, 'alumno', 5, 'asesor', 'Que le digo profe, es la mera cabra para esto', 'leído', '2025-05-29 00:19:16'),
(7, 27, 5, 'asesor', 5, 'alumno', 'no sea grosero joven', 'leído', '2025-05-29 00:19:37'),
(8, 26, 5, 'alumno', 2, 'asesor', 'No neta que se la rifó en esta, ahí nos vemos luego. Saludos!', 'leído', '2025-05-29 02:05:23'),
(10, 27, 5, 'alumno', 5, 'asesor', 'Hola profe!!', 'leído', '2025-05-30 04:04:51'),
(11, 27, 5, 'asesor', 5, 'alumno', 'Buenas tardes, en que le puedo ayudar?', 'leído', '2025-05-30 04:09:19'),
(12, 27, 5, 'alumno', 5, 'asesor', 'Me gustaría aprender otra cosa', 'leído', '2025-05-30 04:10:41'),
(13, 27, 5, 'alumno', 5, 'asesor', 'oki??', 'leído', '2025-05-30 04:11:24'),
(14, 27, 5, 'asesor', 5, 'alumno', 'está bien, mañana empezamos', 'leído', '2025-05-30 04:14:41'),
(15, 27, 5, 'alumno', 5, 'asesor', 'Arreee', 'leído', '2025-05-30 04:15:08'),
(16, 27, 5, 'asesor', 5, 'alumno', 'empezamos la proxima sesión', 'leído', '2025-05-30 04:17:15'),
(17, 27, 5, 'alumno', 5, 'asesor', 'bien, gracias profe', 'leído', '2025-05-30 04:19:29'),
(18, 27, 5, 'alumno', 5, 'asesor', 'va', 'leído', '2025-05-30 04:20:53'),
(19, 27, 5, 'alumno', 5, 'asesor', 'va', 'leído', '2025-05-30 04:22:55'),
(20, 27, 5, 'alumno', 5, 'asesor', 'prueba2.0', 'leído', '2025-05-30 04:24:20'),
(21, 27, 5, 'alumno', 5, 'asesor', 'okok', 'leído', '2025-05-30 04:37:19'),
(22, 27, 5, 'alumno', 5, 'asesor', 'okok', 'leído', '2025-05-30 04:38:38'),
(23, 27, 5, 'alumno', 5, 'asesor', 'koko', 'leído', '2025-05-30 04:38:44'),
(24, 26, 5, 'alumno', 2, 'asesor', 'Hola profe', 'leído', '2025-05-30 12:05:52'),
(25, 27, 5, 'alumno', 5, 'asesor', 'Hola de nuevo', 'leído', '2025-05-30 14:23:12'),
(26, 27, 5, 'alumno', 5, 'asesor', 'Hola otra vez!!', 'leído', '2025-05-30 14:24:05'),
(27, 27, 5, 'alumno', 5, 'asesor', 'pssss!!', 'leído', '2025-05-30 14:25:48'),
(28, 27, 5, 'alumno', 5, 'asesor', 'Hola profe', 'leído', '2025-05-30 15:16:58'),
(29, 27, 5, 'asesor', 5, 'alumno', 'que pasó joven?', 'leído', '2025-05-30 15:19:47'),
(30, 27, 5, 'alumno', 5, 'asesor', 'Nada, le quería avisar que no me quedaron claros algunos temas', 'leído', '2025-05-30 15:20:42'),
(31, 27, 5, 'asesor', 5, 'alumno', 'Ok, luego lo vemos', 'leído', '2025-05-30 16:36:16'),
(32, 27, 5, 'alumno', 5, 'asesor', 'va que va', 'leído', '2025-05-30 17:39:42'),
(33, 27, 5, 'alumno', 5, 'asesor', 'hola esta es una prueba de mensajes', 'leído', '2025-05-30 17:40:10'),
(34, 27, 5, 'asesor', 5, 'alumno', 'Hola', 'leído', '2025-05-30 18:30:53'),
(35, 27, 5, 'alumno', 5, 'asesor', 'Hola', 'leído', '2025-05-30 19:49:01'),
(36, 27, 5, 'alumno', 5, 'asesor', 'Le queria preguntar algo', 'leído', '2025-05-30 19:49:59'),
(37, 27, 5, 'asesor', 5, 'alumno', 'Que pasó joven?', 'enviado', '2025-05-30 20:11:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `solicitud_id` int(11) DEFAULT NULL,
  `destinatario_tipo` enum('estudiante','asesor','administrador') DEFAULT NULL,
  `destinatario_id` int(11) DEFAULT NULL,
  `mensaje` text DEFAULT NULL,
  `fecha_envio` datetime DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  KEY `solicitud_id` (`solicitud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `solicitud_id`, `destinatario_tipo`, `destinatario_id`, `mensaje`, `fecha_envio`, `estado`) VALUES
(1, 1, 'asesor', 1, 'Tienes una nueva solicitud de tutoría', '2025-03-26 10:00:00', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_encuesta`
--

DROP TABLE IF EXISTS `preguntas_encuesta`;
CREATE TABLE IF NOT EXISTS `preguntas_encuesta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `encuesta_id` int(11) DEFAULT NULL,
  `pregunta` text DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  KEY `encuesta_id` (`encuesta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

DROP TABLE IF EXISTS `reportes`;
CREATE TABLE IF NOT EXISTS `reportes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_generacion` datetime DEFAULT NULL,
  `total_asesorias` int(11) DEFAULT NULL,
  `total_atendidas` int(11) DEFAULT NULL,
  `total_pendientes` int(11) DEFAULT NULL,
  `promedio_tiempo_respuesta` decimal(5,2) DEFAULT NULL,
  `promedio_tiempo_resolucion` decimal(5,2) DEFAULT NULL,
  `promedio_cumplimiento` decimal(5,2) DEFAULT NULL,
  `total_horas_asesoria` decimal(5,2) DEFAULT NULL,
  `filtro_fecha_inicio` datetime DEFAULT NULL,
  `filtro_fecha_fin` datetime DEFAULT NULL,
  `filtro_area_especializacion` varchar(255) DEFAULT NULL,
  `filtro_asesor_id` int(11) DEFAULT NULL,
  `filtro_estado` varchar(255) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`id`, `titulo`, `descripcion`, `fecha_generacion`, `total_asesorias`, `total_atendidas`, `total_pendientes`, `promedio_tiempo_respuesta`, `promedio_tiempo_resolucion`, `promedio_cumplimiento`, `total_horas_asesoria`, `filtro_fecha_inicio`, `filtro_fecha_fin`, `filtro_area_especializacion`, `filtro_asesor_id`, `filtro_estado`, `estado`) VALUES
(1, 'Reporte Mensual de Asesorías', 'Análisis del desempeño de las asesorías durante el mes de marzo.', '2025-04-01 06:59:59', 120, 95, 25, 2.50, 5.80, NULL, 300.50, '2025-03-01 00:00:00', '2025-03-31 23:59:59', 'Matemáticas', 3, NULL, 'activo'),
(2, 'Reporte Mensual de Asesorías', 'Análisis del desempeño de las asesorías durante el mes de marzo.', '2025-04-01 06:59:59', 120, 95, 25, 2.50, 5.80, NULL, 300.50, '2025-03-01 00:00:00', '2025-03-31 23:59:59', 'Matemáticas', 3, NULL, 'activo'),
(3, 'Reporte de Primer Trimestre', 'Resumen de asesorías realizadas en el primer trimestre del año.', '2025-04-01 07:00:00', 350, 310, 40, 3.10, 6.40, NULL, 950.70, '2025-01-01 00:00:00', '2025-03-31 23:59:59', 'Física', 7, NULL, 'activo'),
(4, 'Reporte de Asesorías Pendientes', 'Lista de asesorías que no han sido atendidas en el último mes.', '2025-04-01 06:59:59', 50, 10, 40, 5.00, 0.00, NULL, 0.00, '2025-03-01 00:00:00', '2025-03-31 23:59:59', 'Química', 2, NULL, 'inactivo'),
(5, 'Reporte Semanal de Asesorías', 'Estadísticas de asesorías brindadas en la última semana.', '2025-03-25 06:59:59', 80, 75, 5, 1.80, 4.50, NULL, 215.30, '2025-03-18 00:00:00', '2025-03-24 23:59:59', 'Programación', 5, NULL, 'activo'),
(6, 'Reporte de Eficiencia de Asesorías', 'Evaluación del tiempo de respuesta y resolución de asesorías.', '2025-04-05 19:30:00', 200, 180, 20, 2.20, 5.00, NULL, 540.20, '2025-02-01 00:00:00', '2025-04-01 23:59:59', 'Biología', 8, NULL, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes_asesorias`
--

DROP TABLE IF EXISTS `reportes_asesorias`;
CREATE TABLE IF NOT EXISTS `reportes_asesorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reporte_id` int(11) DEFAULT NULL,
  `asesoria_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reporte_id` (`reporte_id`),
  KEY `asesoria_id` (`asesoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
CREATE TABLE IF NOT EXISTS `solicitudes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante_id` int(11) DEFAULT NULL,
  `asesor_id` int(11) DEFAULT NULL,
  `tema` varchar(255) NOT NULL,
  `observaciones` text DEFAULT NULL,
  `fecha_limite` date DEFAULT NULL,
  `modalidad` enum('en_linea','presencial') DEFAULT NULL,
  `nivel_urgencia` enum('baja','media','alta') DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  KEY `estudiante_id` (`estudiante_id`),
  KEY `asesor_id` (`asesor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`id`, `estudiante_id`, `asesor_id`, `tema`, `observaciones`, `fecha_limite`, `modalidad`, `nivel_urgencia`, `estado`) VALUES
(1, 1, 1, 'Álgebra', 'Dudas con ecuaciones', '2025-04-10', 'en_linea', 'alta', 'activo'),
(2, 1, 1, 'Programación Orientada a Objetos en Python', 'El estudiante muestra buen avance.', '2025-09-25', 'en_linea', 'media', 'activo'),
(3, 2, 2, 'Cálculo Multivariable', 'ninguna', '2025-10-18', 'presencial', 'baja', 'activo'),
(4, 2, 2, 'Calculo vectorial', 'ninguna', '2025-04-21', 'presencial', 'media', 'activo'),
(5, 5, 5, 'Programación Web', 'Conexión de una interfaz con una API', '2025-05-22', 'en_linea', 'alta', 'inactivo'),
(6, 5, 5, 'Física Cuántica', 'fdsafdasf', '2025-05-02', 'en_linea', 'media', 'inactivo'),
(7, 5, 5, 'Matemáticas Avanzadas', 'fdsagrhad', '2025-05-23', 'presencial', 'baja', 'inactivo'),
(9, 5, NULL, 'Física', 'Particularidades de los neutrinos en el vacio', '2025-05-25', 'presencial', 'media', 'inactivo'),
(10, 5, NULL, 'Física', 'NEUTRINOOOOS', '2025-05-26', 'presencial', 'media', 'inactivo'),
(23, 5, 2, 'Física', 'fdsfsdffd', '2025-05-28', 'presencial', 'media', 'activo'),
(24, 5, 2, 'Dinámica', 'hOLA COMO ESTASTFDS', '2025-05-23', 'en_linea', 'media', 'activo'),
(25, 5, 2, 'Física', 'FDASFDASFSDF', '2025-05-23', 'presencial', 'media', 'activo'),
(26, 5, NULL, 'Contabilidad', 'fjdasklñfjlñdas', '2025-05-26', 'presencial', 'alta', 'inactivo'),
(27, 5, 2, 'Física', 'fjdklajñklñjcklñc', '2025-05-28', 'presencial', 'baja', 'activo'),
(28, 5, 5, 'Electromagnetismo', 'jkljklñfkdñsac', '2025-05-27', 'en_linea', 'media', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_administradores`
--

DROP TABLE IF EXISTS `solicitudes_administradores`;
CREATE TABLE IF NOT EXISTS `solicitudes_administradores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `solicitud_id` int(11) DEFAULT NULL,
  `administrador_id` int(11) DEFAULT NULL,
  `tipo_accion` enum('creacion','resignacion') DEFAULT NULL,
  `fecha_accion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitud_id` (`solicitud_id`),
  KEY `administrador_id` (`administrador_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asesorias`
--
ALTER TABLE `asesorias`
  ADD CONSTRAINT `asesorias_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`);

--
-- Filtros para la tabla `calendario`
--
ALTER TABLE `calendario`
  ADD CONSTRAINT `calendario_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`);

--
-- Filtros para la tabla `contenido_apoyo`
--
ALTER TABLE `contenido_apoyo`
  ADD CONSTRAINT `contenido_apoyo_ibfk_1` FOREIGN KEY (`asesor_id`) REFERENCES `asesores` (`id`);

--
-- Filtros para la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD CONSTRAINT `encuestas_ibfk_1` FOREIGN KEY (`asesoria_id`) REFERENCES `asesorias` (`id`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_asesoria`) REFERENCES `asesorias` (`id`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`);

--
-- Filtros para la tabla `preguntas_encuesta`
--
ALTER TABLE `preguntas_encuesta`
  ADD CONSTRAINT `preguntas_encuesta_ibfk_1` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`id`);

--
-- Filtros para la tabla `reportes_asesorias`
--
ALTER TABLE `reportes_asesorias`
  ADD CONSTRAINT `reportes_asesorias_ibfk_1` FOREIGN KEY (`reporte_id`) REFERENCES `reportes` (`id`),
  ADD CONSTRAINT `reportes_asesorias_ibfk_2` FOREIGN KEY (`asesoria_id`) REFERENCES `asesorias` (`id`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`),
  ADD CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`asesor_id`) REFERENCES `asesores` (`id`);

--
-- Filtros para la tabla `solicitudes_administradores`
--
ALTER TABLE `solicitudes_administradores`
  ADD CONSTRAINT `solicitudes_administradores_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`),
  ADD CONSTRAINT `solicitudes_administradores_ibfk_2` FOREIGN KEY (`administrador_id`) REFERENCES `administradores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
