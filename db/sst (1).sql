-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 12, 2021 at 09:32 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sst`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE IF NOT EXISTS `appointments` (
  `appointment_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `centre_id` int(11) NOT NULL,
  `appointment_date` date NOT NULL,
  PRIMARY KEY (`appointment_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE IF NOT EXISTS `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `city`, `latitude`, `longitude`) VALUES
(1, 'Pune', 200, 200),
(2, 'Mumbai', 200, 300),
(3, 'Nashik', 120, 200),
(4, 'Nagpur', 80, 250),
(5, 'Bhopal', 150, 300),
(6, 'Raipur', 170, 280),
(7, 'hyedrabad', 100, 120),
(8, 'bengaluru', 100, 110);

-- --------------------------------------------------------

--
-- Table structure for table `distances`
--

DROP TABLE IF EXISTS `distances`;
CREATE TABLE IF NOT EXISTS `distances` (
  `route_key` int(11) NOT NULL,
  `distance` int(11) NOT NULL,
  KEY `fk3` (`route_key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `distances`
--

INSERT INTO `distances` (`route_key`, `distance`) VALUES
(100, 149),
(101, 212),
(102, 710),
(103, 353),
(104, 284),
(105, 629),
(106, 779),
(107, 570),
(108, 170);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `age` int(11) NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
CREATE TABLE IF NOT EXISTS `routes` (
  `route_key` int(11) NOT NULL AUTO_INCREMENT,
  `src` int(11) NOT NULL,
  `dest` int(11) NOT NULL,
  PRIMARY KEY (`route_key`),
  KEY `fk1` (`src`),
  KEY `fk2` (`dest`)
) ENGINE=MyISAM AUTO_INCREMENT=109 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`route_key`, `src`, `dest`) VALUES
(100, 1, 2),
(101, 1, 3),
(102, 1, 4),
(103, 4, 5),
(104, 4, 6),
(105, 5, 6),
(106, 6, 7),
(107, 7, 8),
(108, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `vaccination_centres`
--

DROP TABLE IF EXISTS `vaccination_centres`;
CREATE TABLE IF NOT EXISTS `vaccination_centres` (
  `centre_id` int(11) NOT NULL,
  `address` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
