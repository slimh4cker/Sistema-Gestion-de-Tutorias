-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 02, 2025 at 02:56 AM
-- Server version: 11.5.2-MariaDB
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asesorias`
--

-- --------------------------------------------------------

--
-- Table structure for table `administradores`
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `email`, `password`, `estado`) VALUES
(1, 'Juan Pérez', 'juan@admin.com', 'admin123', 'activo'),
(2, 'María Gómez', 'maria@admin.com', 'admin456', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `asesores`
--

DROP TABLE IF EXISTS `asesores`;
CREATE TABLE IF NOT EXISTS `asesores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `area_especializacion` varchar(255) DEFAULT NULL,
  `disponibilidad` varchar(255) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `asesores`
--

INSERT INTO `asesores` (`id`, `nombre`, `email`, `password`, `area_especializacion`, `disponibilidad`, `estado`) VALUES
(1, 'Carlos Torres', 'carlos@asesor.com', 'asesor123', 'Matemáticas', 'Lunes-Viernes', 'activo'),
(2, 'Ana López', 'ana@asesor.com', 'asesor456', 'Física', 'Martes y Jueves', 'activo'),
(5, 'Carlos Ramírez', 'carlos.ramirez@example.com', '$2b$10$EjemploDeHashContraseñaEncriptada', 'Matemáticas Avanzadas', 'Lunes a Viernes de 9:00 AM a 5:00 PM', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `asesorias`
--

DROP TABLE IF EXISTS `asesorias`;
CREATE TABLE IF NOT EXISTS `asesorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `solicitud_id` int(11) DEFAULT NULL,
  `estado` enum('pendiente','asignada','en_progreso','terminada','aplazada') DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_atencion` date DEFAULT NULL,
  `hora_inicial` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `total_horas` decimal(5,2) DEFAULT NULL,
  `porcentaje_cumplimiento` decimal(5,2) DEFAULT NULL,
  `requiere_sesiones` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitud_id` (`solicitud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `asesorias`
--

INSERT INTO `asesorias` (`id`, `solicitud_id`, `estado`, `fecha_creacion`, `fecha_atencion`, `hora_inicial`, `hora_final`, `total_horas`, `porcentaje_cumplimiento`, `requiere_sesiones`) VALUES
(1, 1, 'pendiente', '2025-04-24 00:00:00', NULL, '11:00:00', '12:11:09', NULL, 80.00, NULL),
(2, 1, 'asignada', '2025-05-24 00:00:00', '2025-06-01', '12:00:00', '13:07:01', NULL, 78.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `calendario`
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
-- Dumping data for table `calendario`
--

INSERT INTO `calendario` (`id`, `solicitud_id`, `fecha_sesion`, `evento_calendar_id`, `recordatorio_enviado`, `fecha_recordatorio`, `estado`) VALUES
(1, 1, '2025-04-10 15:00:00', 'ABC123', 0, '2025-04-10 12:00:00', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `contenido_apoyo`
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
-- Dumping data for table `contenido_apoyo`
--

INSERT INTO `contenido_apoyo` (`id`, `asesor_id`, `titulo`, `descripcion`, `url_video`, `fecha_subida`, `estado`) VALUES
(1, 1, 'Introducción a Álgebra', 'Video sobre ecuaciones básicas', 'https://video.com/algebra', '2025-03-25 10:00:00', 'activo'),
(2, 2, 'No es más que basura marina', 'Como se relacionan los seres acuaticos', 'https://www.youtube.com/watch?v=IUyozpuSUIk', '2025-03-25 21:12:12', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `encuestas`
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
-- Table structure for table `estudiantes`
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `nombre`, `email`, `password`, `estado`) VALUES
(1, 'Luis Ramírez', 'luis@estudiante.com', 'estudiante123', 'inactivo'),
(2, 'Laura Fernández', 'laura@estudiante.com', 'estudiante456', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
CREATE TABLE IF NOT EXISTS `mensajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `solicitud_id` int(11) DEFAULT NULL,
  `emisor_tipo` enum('estudiante','asesor','administrador') DEFAULT NULL,
  `emisor_id` int(11) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_envio` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitud_id` (`solicitud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `mensajes`
--

INSERT INTO `mensajes` (`id`, `solicitud_id`, `emisor_tipo`, `emisor_id`, `contenido`, `fecha_envio`) VALUES
(1, 1, 'estudiante', 1, 'Hola, ¿puedes ayudarme con una duda?', '2025-03-26 09:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
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
-- Dumping data for table `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `solicitud_id`, `destinatario_tipo`, `destinatario_id`, `mensaje`, `fecha_envio`, `estado`) VALUES
(1, 1, 'asesor', 1, 'Tienes una nueva solicitud de tutoría', '2025-03-26 10:00:00', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `preguntas_encuesta`
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
-- Table structure for table `reportes`
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
-- Dumping data for table `reportes`
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
-- Table structure for table `reportes_asesorias`
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
-- Table structure for table `solicitudes`
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `solicitudes`
--

INSERT INTO `solicitudes` (`id`, `estudiante_id`, `asesor_id`, `tema`, `observaciones`, `fecha_limite`, `modalidad`, `nivel_urgencia`, `estado`) VALUES
(1, 1, 1, 'Álgebra', 'Dudas con ecuaciones', '2025-04-10', 'en_linea', 'alta', 'activo'),
(2, 1, 1, 'Programación Orientada a Objetos en Python', 'El estudiante muestra buen avance.', '2025-09-25', 'en_linea', 'media', 'activo'),
(3, 2, 2, 'Cálculo Multivariable', NULL, '2025-10-18', 'presencial', 'baja', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `solicitudes_administradores`
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
-- Constraints for dumped tables
--

--
-- Constraints for table `asesorias`
--
ALTER TABLE `asesorias`
  ADD CONSTRAINT `asesorias_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`);

--
-- Constraints for table `calendario`
--
ALTER TABLE `calendario`
  ADD CONSTRAINT `calendario_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`);

--
-- Constraints for table `contenido_apoyo`
--
ALTER TABLE `contenido_apoyo`
  ADD CONSTRAINT `contenido_apoyo_ibfk_1` FOREIGN KEY (`asesor_id`) REFERENCES `asesores` (`id`);

--
-- Constraints for table `encuestas`
--
ALTER TABLE `encuestas`
  ADD CONSTRAINT `encuestas_ibfk_1` FOREIGN KEY (`asesoria_id`) REFERENCES `asesorias` (`id`);

--
-- Constraints for table `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`);

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`);

--
-- Constraints for table `preguntas_encuesta`
--
ALTER TABLE `preguntas_encuesta`
  ADD CONSTRAINT `preguntas_encuesta_ibfk_1` FOREIGN KEY (`encuesta_id`) REFERENCES `encuestas` (`id`);

--
-- Constraints for table `reportes_asesorias`
--
ALTER TABLE `reportes_asesorias`
  ADD CONSTRAINT `reportes_asesorias_ibfk_1` FOREIGN KEY (`reporte_id`) REFERENCES `reportes` (`id`),
  ADD CONSTRAINT `reportes_asesorias_ibfk_2` FOREIGN KEY (`asesoria_id`) REFERENCES `asesorias` (`id`);

--
-- Constraints for table `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`),
  ADD CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`asesor_id`) REFERENCES `asesores` (`id`);

--
-- Constraints for table `solicitudes_administradores`
--
ALTER TABLE `solicitudes_administradores`
  ADD CONSTRAINT `solicitudes_administradores_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`),
  ADD CONSTRAINT `solicitudes_administradores_ibfk_2` FOREIGN KEY (`administrador_id`) REFERENCES `administradores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
