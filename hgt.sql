-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2025 a las 10:13:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hgt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `rut` varchar(255) NOT NULL,
  `created_At` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `rut`, `created_At`, `updated_at`) VALUES
(11, 'asd', '123', '2024-05-02', '2024-05-02'),
(12, '123', '123', '2024-05-02', '2024-05-02'),
(13, '1231541', '124124', '2024-05-02', '2024-05-02'),
(14, '512512', '123123', '2024-05-02', '2024-05-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `idRequerimiento` int(11) DEFAULT NULL,
  `created_At` date NOT NULL,
  `updated_at` date NOT NULL,
  `hora` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacions`
--

CREATE TABLE `notificacions` (
  `id` int(11) NOT NULL,
  `usuarioReceptor` varchar(255) NOT NULL,
  `nombreNotificante` varchar(255) NOT NULL,
  `encabezado` varchar(255) NOT NULL,
  `idRequerimiento` int(11) DEFAULT NULL,
  `created_At` date NOT NULL,
  `updated_at` date NOT NULL,
  `hora` varchar(255) NOT NULL,
  `isChecked` tinyint(1) NOT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificacions`
--

INSERT INTO `notificacions` (`id`, `usuarioReceptor`, `nombreNotificante`, `encabezado`, `idRequerimiento`, `created_At`, `updated_at`, `hora`, `isChecked`, `foto`) VALUES
(1, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '23:16:05', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(4, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '23:16:05', 0, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(6, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '23:16:05', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(7, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '23:16:05', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(8, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '23:16:05', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(9, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '23:16:05', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(10, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '23:16:05', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(12, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '01:58:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(15, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '01:58:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(16, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '01:58:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(17, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '01:58:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(18, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '01:58:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(19, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '01:58:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(20, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '01:58:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(22, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '02:57:41', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(25, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '02:57:41', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(26, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '02:57:41', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(27, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '02:57:41', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(28, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '02:57:41', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(29, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '02:57:41', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(30, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-19', '2024-05-19', '02:57:41', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(32, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:19:11', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(33, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:19:11', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(37, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:19:11', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(38, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:19:11', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(39, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:19:11', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(40, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:19:11', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(41, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:19:11', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(42, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:34:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(45, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:34:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(46, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:34:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(47, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:34:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(49, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:34:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(50, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:34:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(51, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '23:34:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(52, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:03', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(56, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:03', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(57, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:03', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(58, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:03', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(59, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:03', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(60, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:03', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(61, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:03', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(62, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(66, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(67, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(68, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(69, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(70, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(71, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:15:14', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(73, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:21:24', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(75, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:21:24', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(76, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:21:24', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(78, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:21:24', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(79, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:21:24', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(80, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:21:24', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(81, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '00:21:24', 1, 'http://localhost:3001/uploads/23fb7116-79f0-40e8-995f-db03ab48ffe7.jpg'),
(83, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '01:54:41', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(84, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '01:54:41', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(85, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '01:54:41', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(86, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '01:54:41', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(88, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '01:54:41', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(89, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '01:54:41', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(91, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '01:54:41', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(92, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:17:36', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(95, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:17:36', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(97, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:17:36', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(98, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:17:36', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(99, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:17:36', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(100, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:17:36', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(101, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:17:36', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(102, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:19:10', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(104, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:19:10', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(107, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:19:10', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(108, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:19:10', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(109, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:19:10', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(110, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:19:10', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(111, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:19:10', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(112, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:21:38', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(115, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:21:38', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(117, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:21:38', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(118, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:21:38', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(119, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:21:38', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(120, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:21:38', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(121, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:21:38', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(122, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:22:33', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(126, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:22:33', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(127, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:22:33', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(128, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:22:33', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(129, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:22:33', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(130, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:22:33', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(131, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:22:33', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(132, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:23:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(136, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:23:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(137, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:23:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(138, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:23:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(139, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:23:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(140, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:23:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(141, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:23:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(142, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:24:27', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(144, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:24:27', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(147, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:24:27', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(148, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:24:27', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(149, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:24:27', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(150, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:24:27', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(151, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:24:27', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(152, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:26:21', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(156, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:26:21', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(157, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:26:21', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(158, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:26:21', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(159, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:26:21', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(160, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:26:21', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(161, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:26:21', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(162, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:07', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(163, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:07', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(167, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:07', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(168, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:07', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(169, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:07', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(170, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:07', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(171, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:07', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(172, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:55', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(175, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:55', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(177, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:55', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(178, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:55', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(179, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:55', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(180, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:55', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(181, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:27:55', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(182, 'atest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:28:49', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(186, 'mrojas2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:28:49', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(187, 'pavendano', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:28:49', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(188, 'test3', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:28:49', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(189, 'otest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:28:49', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(190, 'test2', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:28:49', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(191, 'xtest', 'Jose Suazo Valle', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:28:49', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(193, 'pavendano', 'Claudio Sepulveda', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:37:07', 1, '/assets/img/avatar5.png'),
(194, 'test3', 'Claudio Sepulveda', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:37:07', 1, '/assets/img/avatar5.png'),
(195, 'csepulveda', 'Claudio Sepulveda', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:15', 1, '/assets/img/avatar5.png'),
(196, 'pavendano', 'Claudio Sepulveda', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:15', 1, '/assets/img/avatar5.png'),
(197, 'test3', 'Claudio Sepulveda', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:15', 1, '/assets/img/avatar5.png'),
(198, 'csepulveda', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:54', 1, '/assets/img/avatar5.png'),
(199, 'pavendano', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:54', 1, '/assets/img/avatar5.png'),
(200, 'test3', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:54', 1, '/assets/img/avatar5.png'),
(201, 'mrojas2', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:54', 1, '/assets/img/avatar5.png'),
(202, 'atest', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:54', 1, '/assets/img/avatar5.png'),
(203, 'mrojas', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:54', 1, '/assets/img/avatar5.png'),
(204, 'otest', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:54', 1, '/assets/img/avatar5.png'),
(205, 'xtest', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:54', 1, '/assets/img/avatar5.png'),
(206, 'csepulveda', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:58', 1, '/assets/img/avatar5.png'),
(207, 'pavendano', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:58', 1, '/assets/img/avatar5.png'),
(208, 'test3', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:58', 1, '/assets/img/avatar5.png'),
(209, 'atest', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:58', 1, '/assets/img/avatar5.png'),
(210, 'mrojas', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:58', 1, '/assets/img/avatar5.png'),
(211, 'mrojas2', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:58', 1, '/assets/img/avatar5.png'),
(212, 'otest', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:58', 1, '/assets/img/avatar5.png'),
(213, 'xtest', 'mannuel rojas', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:39:58', 1, '/assets/img/avatar5.png'),
(214, 'ayc1', 'ayc1', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:44:09', 1, '/assets/img/avatar5.png'),
(215, 'ayc2', 'ayc1', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:44:09', 0, '/assets/img/avatar5.png'),
(216, 'jsuazo', 'ayc1', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:44:09', 1, '/assets/img/avatar5.png'),
(217, 'pavendano', 'ayc1', 'Se a creado un nuevo evento en el calendario.', 0, '2024-05-20', '2024-05-20', '03:44:09', 1, '/assets/img/avatar5.png'),
(218, 'tao1', 'mannuel rojas', 'Se a asignado un nuevo requerimiento', 112, '2024-05-20', '2024-05-20', '03:53:53', 1, '/assets/img/avatar5.png'),
(219, 'pavendano', 'tao1', 'Se a asignado un nuevo requerimiento', 113, '2024-05-20', '2024-05-20', '03:57:11', 1, '/assets/img/avatar5.png'),
(220, 'atest', 'tao1', 'Se a asignado un nuevo requerimiento', 114, '2024-05-20', '2024-05-20', '03:58:32', 1, '/assets/img/avatar5.png'),
(221, 'mrojas', 'tao1', 'Se a asignado un nuevo requerimiento', 114, '2024-05-20', '2024-05-20', '03:58:32', 1, '/assets/img/avatar5.png'),
(222, 'tao2', 'tao1', 'Se a asignado un nuevo requerimiento', 114, '2024-05-20', '2024-05-20', '03:58:32', 1, '/assets/img/avatar5.png'),
(223, 'mrojas2', 'tao1', 'Se a asignado un nuevo requerimiento', 114, '2024-05-20', '2024-05-20', '03:58:32', 1, '/assets/img/avatar5.png'),
(224, 'otest', 'tao1', 'Se a asignado un nuevo requerimiento', 114, '2024-05-20', '2024-05-20', '03:58:32', 1, '/assets/img/avatar5.png'),
(225, 'pavendano', 'tao1', 'Se a asignado un nuevo requerimiento', 114, '2024-05-20', '2024-05-20', '03:58:32', 1, '/assets/img/avatar5.png'),
(226, 'tao1', 'tao1', 'Se a asignado un nuevo requerimiento', 114, '2024-05-20', '2024-05-20', '03:58:32', 1, '/assets/img/avatar5.png'),
(227, 'xtest', 'tao1', 'Se a asignado un nuevo requerimiento', 114, '2024-05-20', '2024-05-20', '03:58:32', 1, '/assets/img/avatar5.png'),
(228, 'mrojas', 'tao1', 'Se a asignado un nuevo requerimiento', 115, '2024-05-20', '2024-05-20', '03:58:43', 1, '/assets/img/avatar5.png'),
(229, 'csepulveda', 'valormatriz1', 'Se a asignado un nuevo requerimiento', 116, '2024-05-20', '2024-05-20', '04:04:04', 1, '/assets/img/avatar5.png'),
(230, 'pavendano', 'valormatriz1', 'Se a asignado un nuevo requerimiento', 116, '2024-05-20', '2024-05-20', '04:04:04', 1, '/assets/img/avatar5.png'),
(231, 'test3', 'valormatriz1', 'Se a asignado un nuevo requerimiento', 116, '2024-05-20', '2024-05-20', '04:04:04', 1, '/assets/img/avatar5.png'),
(232, 'valormatriz1', 'valormatriz1', 'Se a asignado un nuevo requerimiento', 116, '2024-05-20', '2024-05-20', '04:04:04', 1, '/assets/img/avatar5.png'),
(233, 'valormatriz2', 'valormatriz1', 'Se a asignado un nuevo requerimiento', 116, '2024-05-20', '2024-05-20', '04:04:04', 1, '/assets/img/avatar5.png'),
(234, 'admin', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(235, 'atest', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(236, 'ayc1', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(237, 'ayc2', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(238, 'pavendano', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(239, 'csepulveda', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(240, 'mrojas', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(241, 'mrojas2', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(242, 'otest', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(243, 'tao1', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(244, 'tao2', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(245, 'test2', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(246, 'test3', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(247, 'valormatriz1', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(248, 'valormatriz2', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(249, 'xtest', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 117, '2024-05-20', '2024-05-20', '04:39:32', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg'),
(250, 'admin', 'Jose Suazo Valle', 'Se a asignado un nuevo requerimiento', 118, '2024-05-20', '2024-05-20', '04:42:45', 1, 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `administrador` tinyint(1) DEFAULT NULL,
  `tao` tinyint(1) DEFAULT NULL,
  `ayc` tinyint(1) DEFAULT NULL,
  `valormatriz` tinyint(1) DEFAULT NULL,
  `gestionar_usuarios` tinyint(1) DEFAULT NULL,
  `dashboard` tinyint(1) DEFAULT NULL,
  `gerencia` tinyint(1) DEFAULT NULL,
  `idUsuario` int(11) NOT NULL,
  `created_At` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `usuario`, `administrador`, `tao`, `ayc`, `valormatriz`, `gestionar_usuarios`, `dashboard`, `gerencia`, `idUsuario`, `created_At`, `updated_at`) VALUES
(1, 'admin', 1, 0, 0, 0, 0, 0, 0, 1, '2024-04-30', '2024-04-30'),
(4, 'test2', 0, 0, 1, 0, 0, 0, 0, 12, '2024-05-03', '2024-05-03'),
(5, 'test3', 0, 0, 0, 1, 0, 0, 0, 13, '2024-05-03', '2024-05-10'),
(6, 'csepulveda', 0, 0, 0, 1, 0, 0, 0, 14, '2024-05-10', '2024-05-10'),
(7, 'pavendano', 1, 0, 0, 0, 0, 0, 1, 15, '2024-05-10', '2024-05-10'),
(8, 'mrojas', 0, 1, 0, 1, 0, 0, 0, 16, '2024-05-10', '2024-05-10'),
(9, 'mrojas2', 0, 1, 0, 0, 0, 0, 0, 17, '2024-05-10', '2024-05-10'),
(10, 'atest', 0, 1, 0, 0, 0, 0, 0, 18, '2024-05-10', '2024-05-10'),
(11, 'xtest', 0, 1, 0, 0, 0, 0, 0, 19, '2024-05-10', '2024-05-10'),
(12, 'otest', 0, 0, 0, 0, 0, 0, 0, 20, '2024-05-10', '2024-05-10'),
(13, 'ayc1', 0, 1, 1, 1, 0, 0, 0, 21, '2024-05-20', '2024-05-20'),
(14, 'ayc2', 0, 0, 1, 0, 0, 0, 0, 22, '2024-05-20', '2024-05-20'),
(15, 'tao1', 0, 1, 0, 0, 0, 0, 0, 23, '2024-05-20', '2024-05-20'),
(16, 'tao2', 0, 1, 0, 0, 0, 0, 0, 24, '2024-05-20', '2024-05-20'),
(17, 'valormatriz1', 0, 0, 0, 1, 0, 0, 0, 25, '2024-05-20', '2024-05-20'),
(18, 'valormatriz2', 0, 0, 0, 1, 0, 0, 0, 26, '2024-05-20', '2024-05-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requerimientos`
--

CREATE TABLE `requerimientos` (
  `id` int(11) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `empresa` varchar(255) NOT NULL,
  `emisor` varchar(255) NOT NULL,
  `receptor` varchar(255) NOT NULL,
  `plazo` int(11) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `created_At` date NOT NULL,
  `updated_at` date NOT NULL,
  `detalle` text NOT NULL,
  `createdHour` varchar(255) NOT NULL,
  `updatedHour` varchar(255) DEFAULT NULL,
  `updatedUser` varchar(255) DEFAULT NULL,
  `cliente` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `archivos` text DEFAULT NULL,
  `archivosnewName` text DEFAULT NULL,
  `isPrivate` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `requerimientos`
--

INSERT INTO `requerimientos` (`id`, `asunto`, `empresa`, `emisor`, `receptor`, `plazo`, `Tipo`, `estado`, `created_At`, `updated_at`, `detalle`, `createdHour`, `updatedHour`, `updatedUser`, `cliente`, `foto`, `archivos`, `archivosnewName`, `isPrivate`) VALUES
(103, 'asd', 'valormatriz', 'csepulveda', 'csepulveda', 1, 'Medio', 'Sin revisión', '2024-05-10', '2024-05-10', 'asdasdsad', '21:03:39', '21:03:39', 'csepulveda', 'N/A', '/assets/img/avatar5.png', '', '', 0),
(104, 'asfasfasf', 'valormatriz', 'csepulveda', 'csepulveda,jsuazo,test2,test3', 5, 'Urgente', 'En proceso', '2024-05-10', '2024-05-10', 'asdasdasd', '21:03:48', '21:29:46', 'csepulveda', 'N/A', '/assets/img/avatar5.png', '', '', 0),
(105, 'asdasd', 'valormatriz', 'pavendano', 'pavendano', 1, 'Urgente', 'Sin revisión', '2024-05-10', '2024-05-10', 'asdasd', '01:35:02', '02:10:51', 'pavendano', 'N/A', '/assets/img/avatar5.png', 'un texto?', 'un texto?', 0),
(106, 'mrojas asunto', 'tao', 'pavendano', 'pavendano', 1, 'Medio', 'Sin revisión', '2024-05-10', '2024-05-10', 'asd', '01:39:37', '02:11:30', 'pavendano', 'N/A', '/assets/img/avatar5.png', 'un texto?', 'un texto?', 0),
(112, 'Requerimiento prueba mrojas', 'tao', 'mrojas', 'tao1', 5, 'Urgente', 'Sin revisión', '2024-05-20', '2024-05-20', 'esto es urgente', '03:53:53', '03:53:53', 'mrojas', 'N/A', '/assets/img/avatar5.png', '', '', 1),
(113, 'asdasdasd', 'tao', 'tao1', 'pavendano', 5, 'Medio', 'Sin revisión', '2024-05-20', '2024-05-20', 'asd', '03:57:11', '03:57:11', 'tao1', 'N/A', '/assets/img/avatar5.png', '', '', 1),
(114, 'requerimiento para todos y ver editable.', 'tao', 'tao2', 'atest,mrojas,mrojas2,otest,pavendano,tao1,tao2,xtest', 5, 'Urgente', 'Sin revisión', '2024-05-20', '2024-05-20', 'asdasdasd', '03:58:32', '03:59:03', 'tao2', 'N/A', '/assets/img/avatar5.png', 'un texto?', 'un texto?', 0),
(115, 'requerimiento solo 2 editan', 'tao', 'tao1', 'mrojas', 5, 'Urgente', 'Sin revisión', '2024-05-20', '2024-05-20', 'asd', '03:58:43', '03:58:43', 'tao1', 'N/A', '/assets/img/avatar5.png', '', '', 0),
(116, 'requerimiento que ve mrojas', 'valormatriz', 'valormatriz1', 'csepulveda,pavendano,test3,valormatriz1,valormatriz2', 5, 'Urgente', 'Sin revisión', '2024-05-20', '2024-05-20', 'asdasd', '04:04:04', '04:04:04', 'valormatriz1', 'N/A', '/assets/img/avatar5.png', '', '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requerimientosfiles`
--

CREATE TABLE `requerimientosfiles` (
  `id` int(11) NOT NULL,
  `originalName` text DEFAULT NULL,
  `newName` text DEFAULT NULL,
  `idRequerimiento` int(11) DEFAULT NULL,
  `created_At` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `requerimientosfiles`
--

INSERT INTO `requerimientosfiles` (`id`, `originalName`, `newName`, `idRequerimiento`, `created_At`, `updated_at`) VALUES
(8, '404836643_1172467417471721_581621931549924555_n.jpg', 'http://localhost:3001/uploads/aae09b49-2f36-40e0-9c8c-93678d4e9308.jpg', 106, '2024-05-10', '2024-05-10'),
(9, '404836643_1172467417471721_581621931549924555_n.jpg', 'http://localhost:3001/uploads/2894e402-8ff1-40d1-8830-c53ed073ff6c.jpg', 106, '2024-05-10', '2024-05-10'),
(10, 'MediaCreationTool_22H2 (1).exe', 'http://localhost:3001/uploads/27c17220-99a7-4662-980d-ad2c8ebf3be2.exe', 105, '2024-05-10', '2024-05-10'),
(11, 'jdk-17.0.9_windows-x64_bin.exe', 'http://localhost:3001/uploads/09679608-9205-45fd-8bee-331de1406249.exe', 106, '2024-05-10', '2024-05-10'),
(14, 'cambing.sql', 'http://localhost:3001/uploads/42ab1f53-ac89-4aee-a679-060532620869.sql', 114, '2024-05-20', '2024-05-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `re_contrasena` varchar(255) NOT NULL,
  `foto` text DEFAULT NULL,
  `empresa` varchar(255) NOT NULL,
  `created_At` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `email`, `nombre`, `contrasena`, `re_contrasena`, `foto`, `empresa`, `created_At`, `updated_at`) VALUES
(1, 'admin', 'jsuazo@jsuazo.cl', 'Jose Suazo Valle', 'asd', 'asd', 'http://localhost:3001/uploads/b22ad06e-a94d-45db-8304-e04c16a3e64b.jpg', 'appAtlantis', '2024-04-04', '2024-05-20'),
(12, 'test2', 'asd', 'test2', 'asd', 'asd', 'http://http://localhost:3001/uploads/e0422c44-d889-45fa-958d-e79d0fa65576.jpeg', 'A&C', '2024-05-03', '2024-05-04'),
(13, 'test3', 'asd', 'test3', 'asd', 'asd', '/assets/img/avatar5.png', 'valormatriz', '2024-05-03', '2024-05-03'),
(14, 'csepulveda', 'asd@asd.cl', 'Claudio Sepulveda', 'asd', 'asd', '/assets/img/avatar5.png', 'valormatriz', '2024-05-10', '2024-05-10'),
(15, 'pavendano', 'asd@asd.cl', 'Paulo avendano', 'asd', 'asd', '/assets/img/avatar5.png', 'ayc', '2024-05-10', '2024-05-10'),
(16, 'mrojas', 'asd@asd.cl', 'mannuel rojas', 'asd', 'asd', '/assets/img/avatar5.png', 'tao', '2024-05-10', '2024-05-10'),
(17, 'mrojas2', 'asd', 'manual 2', 'asd', 'asd', '/assets/img/avatar5.png', 'tao', '2024-05-10', '2024-05-10'),
(18, 'atest', 'asd', 'atest', 'asd', 'asd', '/assets/img/avatar5.png', 'tao', '2024-05-10', '2024-05-10'),
(19, 'xtest', 'asd', 'xtex', 'asd', 'asd', '/assets/img/avatar5.png', 'tao', '2024-05-10', '2024-05-10'),
(20, 'otest', 'asd', 'otest', 'asd', 'asd', '/assets/img/avatar5.png', 'tao', '2024-05-10', '2024-05-10'),
(21, 'ayc1', 'asd', 'ayc1', 'asd', 'asd', '/assets/img/avatar5.png', 'ayc', '2024-05-20', '2024-05-20'),
(22, 'ayc2', 'asd', 'ayc2', 'asd', 'asd', '/assets/img/avatar5.png', 'ayc', '2024-05-20', '2024-05-20'),
(23, 'tao1', 'asd', 'tao1', 'asd', 'asd', '/assets/img/avatar5.png', 'tao', '2024-05-20', '2024-05-20'),
(24, 'tao2', 'asd', 'tao2', 'asd', 'asd', '/assets/img/avatar5.png', 'tao', '2024-05-20', '2024-05-20'),
(25, 'valormatriz1', 'asd', 'valormatriz1', 'asd', 'asd', '/assets/img/avatar5.png', 'valormatriz', '2024-05-20', '2024-05-20'),
(26, 'valormatriz2', 'asf', 'valormatriz2', 'asd', 'asd', '/assets/img/avatar5.png', 'valormatriz', '2024-05-20', '2024-05-20');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequerimiento` (`idRequerimiento`);

--
-- Indices de la tabla `notificacions`
--
ALTER TABLE `notificacions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `requerimientos`
--
ALTER TABLE `requerimientos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `requerimientosfiles`
--
ALTER TABLE `requerimientosfiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequerimiento` (`idRequerimiento`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `notificacions`
--
ALTER TABLE `notificacions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `requerimientos`
--
ALTER TABLE `requerimientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de la tabla `requerimientosfiles`
--
ALTER TABLE `requerimientosfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idRequerimiento`) REFERENCES `requerimientos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD CONSTRAINT `permisos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `requerimientosfiles`
--
ALTER TABLE `requerimientosfiles`
  ADD CONSTRAINT `requerimientosfiles_ibfk_1` FOREIGN KEY (`idRequerimiento`) REFERENCES `requerimientos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
