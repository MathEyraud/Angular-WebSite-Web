-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 07 mars 2024 à 07:27
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `akdemia`
--

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_company`
--

DROP TABLE IF EXISTS `akdemia_company`;
CREATE TABLE IF NOT EXISTS `akdemia_company` (
  `ID` int(11) NOT NULL,
  `ACTIVITY` varchar(100) DEFAULT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_employee`
--

DROP TABLE IF EXISTS `akdemia_employee`;
CREATE TABLE IF NOT EXISTS `akdemia_employee` (
  `ID` int(11) NOT NULL,
  `FIRSTNAME` varchar(100) DEFAULT NULL,
  `LASTNAME` varchar(100) DEFAULT NULL,
  `GENDER` varchar(100) DEFAULT NULL,
  `HIGHEST_DIPLOMA` varchar(100) DEFAULT NULL,
  `BIRTH_DATE` date DEFAULT NULL,
  `ID_AKDEMIA_COMPANY` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_EMPLOYEE_AKDEMIA_COMPANY0_FK` (`ID_AKDEMIA_COMPANY`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_employee_souscription`
--

DROP TABLE IF EXISTS `akdemia_employee_souscription`;
CREATE TABLE IF NOT EXISTS `akdemia_employee_souscription` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` varchar(50) DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `ID_AKDEMIA_INTRA_SESSION` int(11) NOT NULL,
  `ID_AKDEMIA_EMPLOYEE` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_EMPLOYEE_SOUSCRIPTION_AKDEMIA_INTRA_SESSION_FK` (`ID_AKDEMIA_INTRA_SESSION`),
  KEY `AKDEMIA_EMPLOYEE_SOUSCRIPTION_AKDEMIA_EMPLOYEE0_FK` (`ID_AKDEMIA_EMPLOYEE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_evaluation`
--

DROP TABLE IF EXISTS `akdemia_evaluation`;
CREATE TABLE IF NOT EXISTS `akdemia_evaluation` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SESSION_SCORE` int(11) DEFAULT NULL,
  `TRAINER_SCORE` int(11) DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `ID_AKDEMIA_SESSION` int(11) NOT NULL,
  `ID_AKDEMIA_EMPLOYEE` int(11) DEFAULT NULL,
  `ID_AKDEMIA_PARTICULAR` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_EVALUATION_AKDEMIA_SESSION_FK` (`ID_AKDEMIA_SESSION`),
  KEY `AKDEMIA_EVALUATION_AKDEMIA_EMPLOYEE0_FK` (`ID_AKDEMIA_EMPLOYEE`),
  KEY `AKDEMIA_EVALUATION_AKDEMIA_PARTICULAR1_FK` (`ID_AKDEMIA_PARTICULAR`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_inter_session`
--

DROP TABLE IF EXISTS `akdemia_inter_session`;
CREATE TABLE IF NOT EXISTS `akdemia_inter_session` (
  `ID` int(11) NOT NULL,
  `MIN_PARTICIPANTS` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_intra_session`
--

DROP TABLE IF EXISTS `akdemia_intra_session`;
CREATE TABLE IF NOT EXISTS `akdemia_intra_session` (
  `ID` int(11) NOT NULL,
  `ID_AKDEMIA_COMPANY` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_INTRA_SESSION_AKDEMIA_COMPANY0_FK` (`ID_AKDEMIA_COMPANY`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_manager`
--

DROP TABLE IF EXISTS `akdemia_manager`;
CREATE TABLE IF NOT EXISTS `akdemia_manager` (
  `ID` int(11) NOT NULL,
  `FIRSTNAME` varchar(100) DEFAULT NULL,
  `LASTNAME` varchar(100) DEFAULT NULL,
  `GENDER` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_particular`
--

DROP TABLE IF EXISTS `akdemia_particular`;
CREATE TABLE IF NOT EXISTS `akdemia_particular` (
  `ID` int(11) NOT NULL,
  `ACTIVITY` varchar(100) DEFAULT NULL,
  `FIRSTNAME` varchar(100) DEFAULT NULL,
  `LASTNAME` varchar(100) DEFAULT NULL,
  `GENDER` varchar(100) DEFAULT NULL,
  `HIGHEST_DIPLOMA` varchar(100) DEFAULT NULL,
  `BIRTH_DATE` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_particular_souscription`
--

DROP TABLE IF EXISTS `akdemia_particular_souscription`;
CREATE TABLE IF NOT EXISTS `akdemia_particular_souscription` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` varchar(50) NOT NULL,
  `CREATION_DATE` datetime NOT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `ID_AKDEMIA_INTER_SESSION` int(11) NOT NULL,
  `ID_AKDEMIA_PARTICULAR` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_PARTICULAR_SOUSCRIPTION_AKDEMIA_INTER_SESSION_FK` (`ID_AKDEMIA_INTER_SESSION`),
  KEY `AKDEMIA_PARTICULAR_SOUSCRIPTION_AKDEMIA_PARTICULAR0_FK` (`ID_AKDEMIA_PARTICULAR`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_planification`
--

DROP TABLE IF EXISTS `akdemia_planification`;
CREATE TABLE IF NOT EXISTS `akdemia_planification` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `START_DATE` date DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `ID_AKDEMIA_COMPANY` int(11) NOT NULL,
  `ID_AKDEMIA_TRAINING` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_PLANIFICATION_AKDEMIA_COMPANY_FK` (`ID_AKDEMIA_COMPANY`),
  KEY `AKDEMIA_PLANIFICATION_AKDEMIA_TRAINING0_FK` (`ID_AKDEMIA_TRAINING`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_privilege`
--

DROP TABLE IF EXISTS `akdemia_privilege`;
CREATE TABLE IF NOT EXISTS `akdemia_privilege` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `ID_AKDEMIA_USER` int(11) NOT NULL,
  `ID_AKDEMIA_ROLE` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_PRIVILEGE_AKDEMIA_USER_FK` (`ID_AKDEMIA_USER`),
  KEY `AKDEMIA_PRIVILEGE_AKDEMIA_ROLE0_FK` (`ID_AKDEMIA_ROLE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_requirement`
--

DROP TABLE IF EXISTS `akdemia_requirement`;
CREATE TABLE IF NOT EXISTS `akdemia_requirement` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `LINK` text DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_role`
--

DROP TABLE IF EXISTS `akdemia_role`;
CREATE TABLE IF NOT EXISTS `akdemia_role` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROLE_NAME` varchar(100) DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_session`
--

DROP TABLE IF EXISTS `akdemia_session`;
CREATE TABLE IF NOT EXISTS `akdemia_session` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODE` varchar(100) DEFAULT NULL,
  `DURATION` decimal(10,0) DEFAULT NULL,
  `PRICE` double DEFAULT NULL,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `STATUS` varchar(50) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  `LACATION` varchar(100) DEFAULT NULL,
  `SESSION_SCORE` int(11) DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `ID_AKDEMIA_TRAINER` int(11) DEFAULT NULL,
  `ID_AKDEMIA_TRAINING` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_SESSION_AKDEMIA_TRAINER_FK` (`ID_AKDEMIA_TRAINER`),
  KEY `AKDEMIA_SESSION_AKDEMIA_TRAINING0_FK` (`ID_AKDEMIA_TRAINING`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_sub_theme`
--

DROP TABLE IF EXISTS `akdemia_sub_theme`;
CREATE TABLE IF NOT EXISTS `akdemia_sub_theme` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SUBTHEME_TITLE` varchar(100) DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_test`
--

DROP TABLE IF EXISTS `akdemia_test`;
CREATE TABLE IF NOT EXISTS `akdemia_test` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) DEFAULT NULL,
  `DESCRITION` text DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_theme`
--

DROP TABLE IF EXISTS `akdemia_theme`;
CREATE TABLE IF NOT EXISTS `akdemia_theme` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `THEME_TITLE` varchar(100) DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_trainer`
--

DROP TABLE IF EXISTS `akdemia_trainer`;
CREATE TABLE IF NOT EXISTS `akdemia_trainer` (
  `ID` int(11) NOT NULL,
  `ACTIVITY` varchar(100) DEFAULT NULL,
  `CV_LINK` varchar(100) DEFAULT NULL,
  `FIRSTNAME` varchar(100) DEFAULT NULL,
  `LASTNAME` varchar(100) DEFAULT NULL,
  `GENDER` varchar(100) DEFAULT NULL,
  `ID_AKDEMIA_VALIDATION_TEST` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_TRAINER_AKDEMIA_VALIDATION_TEST0_FK` (`ID_AKDEMIA_VALIDATION_TEST`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_training`
--

DROP TABLE IF EXISTS `akdemia_training`;
CREATE TABLE IF NOT EXISTS `akdemia_training` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(100) DEFAULT NULL,
  `DESCRIPTION` varchar(500) DEFAULT NULL,
  `TRAINING_PRICE` double DEFAULT NULL,
  `LOGO` longtext DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `ID_AKDEMIA_REQUIREMENT` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_TRAINING_AKDEMIA_REQUIREMENT_FK` (`ID_AKDEMIA_REQUIREMENT`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_user`
--

DROP TABLE IF EXISTS `akdemia_user`;
CREATE TABLE IF NOT EXISTS `akdemia_user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PHONE` varchar(50) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `ADDRESS` varchar(50) DEFAULT NULL,
  `LOGIN` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(100) DEFAULT NULL,
  `PHOTO` varchar(100) DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `akdemia_validation_test`
--

DROP TABLE IF EXISTS `akdemia_validation_test`;
CREATE TABLE IF NOT EXISTS `akdemia_validation_test` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEST_DATE` date DEFAULT NULL,
  `SCORE` int(11) DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `ID_AKDEMIA_TRAINING` int(11) NOT NULL,
  `ID_AKDEMIA_TEST` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `AKDEMIA_VALIDATION_TEST_AKDEMIA_TRAINING_FK` (`ID_AKDEMIA_TRAINING`),
  KEY `AKDEMIA_VALIDATION_TEST_AKDEMIA_TEST0_FK` (`ID_AKDEMIA_TEST`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `compose`
--

DROP TABLE IF EXISTS `compose`;
CREATE TABLE IF NOT EXISTS `compose` (
  `ID` int(11) NOT NULL,
  `ID_AKDEMIA_SUB_THEME` int(11) NOT NULL,
  PRIMARY KEY (`ID`,`ID_AKDEMIA_SUB_THEME`),
  KEY `COMPOSE_AKDEMIA_SUB_THEME0_FK` (`ID_AKDEMIA_SUB_THEME`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE IF NOT EXISTS `content` (
  `ID` int(11) NOT NULL,
  `ID_AKDEMIA_TRAINING` int(11) NOT NULL,
  PRIMARY KEY (`ID`,`ID_AKDEMIA_TRAINING`),
  KEY `CONTENT_AKDEMIA_TRAINING0_FK` (`ID_AKDEMIA_TRAINING`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `akdemia_company`
--
ALTER TABLE `akdemia_company`
  ADD CONSTRAINT `AKDEMIA_COMPANY_AKDEMIA_USER_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_user` (`ID`);

--
-- Contraintes pour la table `akdemia_employee`
--
ALTER TABLE `akdemia_employee`
  ADD CONSTRAINT `AKDEMIA_EMPLOYEE_AKDEMIA_COMPANY0_FK` FOREIGN KEY (`ID_AKDEMIA_COMPANY`) REFERENCES `akdemia_company` (`ID`),
  ADD CONSTRAINT `AKDEMIA_EMPLOYEE_AKDEMIA_USER_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_user` (`ID`);

--
-- Contraintes pour la table `akdemia_employee_souscription`
--
ALTER TABLE `akdemia_employee_souscription`
  ADD CONSTRAINT `AKDEMIA_EMPLOYEE_SOUSCRIPTION_AKDEMIA_EMPLOYEE0_FK` FOREIGN KEY (`ID_AKDEMIA_EMPLOYEE`) REFERENCES `akdemia_employee` (`ID`),
  ADD CONSTRAINT `AKDEMIA_EMPLOYEE_SOUSCRIPTION_AKDEMIA_INTRA_SESSION_FK` FOREIGN KEY (`ID_AKDEMIA_INTRA_SESSION`) REFERENCES `akdemia_intra_session` (`ID`);

--
-- Contraintes pour la table `akdemia_evaluation`
--
ALTER TABLE `akdemia_evaluation`
  ADD CONSTRAINT `AKDEMIA_EVALUATION_AKDEMIA_EMPLOYEE0_FK` FOREIGN KEY (`ID_AKDEMIA_EMPLOYEE`) REFERENCES `akdemia_employee` (`ID`),
  ADD CONSTRAINT `AKDEMIA_EVALUATION_AKDEMIA_PARTICULAR1_FK` FOREIGN KEY (`ID_AKDEMIA_PARTICULAR`) REFERENCES `akdemia_particular` (`ID`),
  ADD CONSTRAINT `AKDEMIA_EVALUATION_AKDEMIA_SESSION_FK` FOREIGN KEY (`ID_AKDEMIA_SESSION`) REFERENCES `akdemia_session` (`ID`);

--
-- Contraintes pour la table `akdemia_inter_session`
--
ALTER TABLE `akdemia_inter_session`
  ADD CONSTRAINT `AKDEMIA_INTER_SESSION_AKDEMIA_SESSION_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_session` (`ID`);

--
-- Contraintes pour la table `akdemia_intra_session`
--
ALTER TABLE `akdemia_intra_session`
  ADD CONSTRAINT `AKDEMIA_INTRA_SESSION_AKDEMIA_COMPANY0_FK` FOREIGN KEY (`ID_AKDEMIA_COMPANY`) REFERENCES `akdemia_company` (`ID`),
  ADD CONSTRAINT `AKDEMIA_INTRA_SESSION_AKDEMIA_SESSION_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_session` (`ID`);

--
-- Contraintes pour la table `akdemia_manager`
--
ALTER TABLE `akdemia_manager`
  ADD CONSTRAINT `AKDEMIA_MANAGER_AKDEMIA_USER_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_user` (`ID`);

--
-- Contraintes pour la table `akdemia_particular`
--
ALTER TABLE `akdemia_particular`
  ADD CONSTRAINT `AKDEMIA_PARTICULAR_AKDEMIA_USER_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_user` (`ID`);

--
-- Contraintes pour la table `akdemia_particular_souscription`
--
ALTER TABLE `akdemia_particular_souscription`
  ADD CONSTRAINT `AKDEMIA_PARTICULAR_SOUSCRIPTION_AKDEMIA_INTER_SESSION_FK` FOREIGN KEY (`ID_AKDEMIA_INTER_SESSION`) REFERENCES `akdemia_inter_session` (`ID`),
  ADD CONSTRAINT `AKDEMIA_PARTICULAR_SOUSCRIPTION_AKDEMIA_PARTICULAR0_FK` FOREIGN KEY (`ID_AKDEMIA_PARTICULAR`) REFERENCES `akdemia_particular` (`ID`);

--
-- Contraintes pour la table `akdemia_planification`
--
ALTER TABLE `akdemia_planification`
  ADD CONSTRAINT `AKDEMIA_PLANIFICATION_AKDEMIA_COMPANY_FK` FOREIGN KEY (`ID_AKDEMIA_COMPANY`) REFERENCES `akdemia_company` (`ID`),
  ADD CONSTRAINT `AKDEMIA_PLANIFICATION_AKDEMIA_TRAINING0_FK` FOREIGN KEY (`ID_AKDEMIA_TRAINING`) REFERENCES `akdemia_training` (`ID`);

--
-- Contraintes pour la table `akdemia_privilege`
--
ALTER TABLE `akdemia_privilege`
  ADD CONSTRAINT `AKDEMIA_PRIVILEGE_AKDEMIA_ROLE0_FK` FOREIGN KEY (`ID_AKDEMIA_ROLE`) REFERENCES `akdemia_role` (`ID`),
  ADD CONSTRAINT `AKDEMIA_PRIVILEGE_AKDEMIA_USER_FK` FOREIGN KEY (`ID_AKDEMIA_USER`) REFERENCES `akdemia_user` (`ID`);

--
-- Contraintes pour la table `akdemia_session`
--
ALTER TABLE `akdemia_session`
  ADD CONSTRAINT `AKDEMIA_SESSION_AKDEMIA_TRAINER_FK` FOREIGN KEY (`ID_AKDEMIA_TRAINER`) REFERENCES `akdemia_trainer` (`ID`),
  ADD CONSTRAINT `AKDEMIA_SESSION_AKDEMIA_TRAINING0_FK` FOREIGN KEY (`ID_AKDEMIA_TRAINING`) REFERENCES `akdemia_training` (`ID`);

--
-- Contraintes pour la table `akdemia_trainer`
--
ALTER TABLE `akdemia_trainer`
  ADD CONSTRAINT `AKDEMIA_TRAINER_AKDEMIA_USER_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_user` (`ID`),
  ADD CONSTRAINT `AKDEMIA_TRAINER_AKDEMIA_VALIDATION_TEST0_FK` FOREIGN KEY (`ID_AKDEMIA_VALIDATION_TEST`) REFERENCES `akdemia_validation_test` (`ID`);

--
-- Contraintes pour la table `akdemia_training`
--
ALTER TABLE `akdemia_training`
  ADD CONSTRAINT `AKDEMIA_TRAINING_AKDEMIA_REQUIREMENT_FK` FOREIGN KEY (`ID_AKDEMIA_REQUIREMENT`) REFERENCES `akdemia_requirement` (`ID`);

--
-- Contraintes pour la table `akdemia_validation_test`
--
ALTER TABLE `akdemia_validation_test`
  ADD CONSTRAINT `AKDEMIA_VALIDATION_TEST_AKDEMIA_TEST0_FK` FOREIGN KEY (`ID_AKDEMIA_TEST`) REFERENCES `akdemia_test` (`ID`),
  ADD CONSTRAINT `AKDEMIA_VALIDATION_TEST_AKDEMIA_TRAINING_FK` FOREIGN KEY (`ID_AKDEMIA_TRAINING`) REFERENCES `akdemia_training` (`ID`);

--
-- Contraintes pour la table `compose`
--
ALTER TABLE `compose`
  ADD CONSTRAINT `COMPOSE_AKDEMIA_SUB_THEME0_FK` FOREIGN KEY (`ID_AKDEMIA_SUB_THEME`) REFERENCES `akdemia_sub_theme` (`ID`),
  ADD CONSTRAINT `COMPOSE_AKDEMIA_THEME_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_theme` (`ID`);

--
-- Contraintes pour la table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `CONTENT_AKDEMIA_SUB_THEME_FK` FOREIGN KEY (`ID`) REFERENCES `akdemia_sub_theme` (`ID`),
  ADD CONSTRAINT `CONTENT_AKDEMIA_TRAINING0_FK` FOREIGN KEY (`ID_AKDEMIA_TRAINING`) REFERENCES `akdemia_training` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
