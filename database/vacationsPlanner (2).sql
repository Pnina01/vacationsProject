-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 09, 2023 at 06:16 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsPlanner`
--
CREATE DATABASE IF NOT EXISTS `vacationsPlanner` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsPlanner`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(14, 35),
(14, 30),
(14, 37),
(14, 36),
(17, 39),
(17, 40),
(17, 38),
(14, 35),
(14, 37),
(14, 28),
(14, 38);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `email`, `password`, `role`) VALUES
(2, 'Ruth', 'Betech', 'ruthbet', 'ruthbet@gmail.com', 'Ruth4455', '2'),
(3, 'Pnina', 'Chuwer', 'pninach', 'pninach@gmail.com', '5b685bd016d9f04ac2dffc3970ebb3df0da0c6191dca923619ec18549b7c5ae16c82c6a4931c582818a3acde42785550b3830d454da5c0526bb7ba80a3ac6526', 'User'),
(5, 'Yael', 'Tawil', 'yaelita', 'yaela@gmail.com', 'e4782bb7a73d2154dd8e0ab8d18ee55887ce1488f622777035af57d661117386e7bfdf5d639389f76ce7aeb7d16906f1f0129dd1f8c760fae22906966708a796', '2'),
(6, 'Moshe', 'Cohen', 'MosheC', 'moshe@gmail.com', '123456', '2'),
(9, 'Pancho', 'Gomez', 'PanchoG', 'pancho@gmail.com', '500b3f46a90343bfb5af79d6eb7318700288b627ba2d57207b456a79acf9064dcf9d5bb4e3063bba86c1b7cb6f5a51b1dc8745837021891293b117d87628418f', '2'),
(10, 'Aharon', 'Yossefi', 'AharonYoss', 'aharon@gmail.com', 'e178d5ec4c9953f01a4f3c82f60b904936cee01bd45c4472a94667430999f3f8175f9f027f051a52cef4c987f4f8b1954d68b795c31b2e39d9876612037fa121', 'Admin'),
(11, 'Esther', 'Berman', 'EstherB', 'est@gmail.com', '2468', '2'),
(12, 'Niv', 'Avidan', 'Nivos', 'niv@gmail.com', '12345', '1'),
(13, 'Pnina', 'Berman', 'PninaB', 'pnina@gmail.com', 'fc53226c4524505895076d6849cd3b57a8ba1a9217a4a5acdebef2fcbb03c1b47c663d573610e86e59e69907dafab2754e6782becad5c00d23a3fa1ecebb24b0', '2'),
(14, 'Ari', 'Chuwer', 'Arichu', 'ari@gmail.com', '500b3f46a90343bfb5af79d6eb7318700288b627ba2d57207b456a79acf9064dcf9d5bb4e3063bba86c1b7cb6f5a51b1dc8745837021891293b117d87628418f', '2'),
(16, 'yona', 'Berman', 'yonab', 'yona@gmail.com', 'e712af9bf7e72305545a90fa1ca9a952fae05aab5bcaddb793dd73dfde7e73c29467ba845fea7d0f4ea02de39356536f820b8304cf3cda597b68ac0141ecc36a', '2'),
(17, 'hola', 'bye', 'hola', 'pninachu@gmail.com', 'fc53226c4524505895076d6849cd3b57a8ba1a9217a4a5acdebef2fcbb03c1b47c663d573610e86e59e69907dafab2754e6782becad5c00d23a3fa1ecebb24b0', '2');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `vacationStartDate` date NOT NULL,
  `vacationEndDate` date NOT NULL,
  `price` varchar(50) NOT NULL,
  `imageName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `vacationStartDate`, `vacationEndDate`, `price`, `imageName`) VALUES
(28, 'Iceland', 'Breathtaking landscapes, geothermal wonders, and mystical Northern Lights. Unforgettable adventure awaits.', '2023-07-14', '2023-07-28', '10000', '96dba884-7ec0-4620-92f3-7ff82c4e4dae.jpeg'),
(29, 'Miami', 'a vibrant coastal city in Florida known for stunning beaches, lively nightlife, and cultural richness. Enjoy the sun, explore art districts, savor diverse cuisine, shop in glamorous areas, and embrace the city\'s energetic atmosphere. ', '2023-07-29', '2023-08-03', '5000', 'b033d5c1-30eb-4ad3-8169-91249fbced5a.jpeg'),
(30, 'Rio de Janeiro', 'a vibrant coastal city in Brazil known for stunning beaches, iconic landmarks, samba rhythms, and lively neighborhoods. Immerse yourself in the energy, indulge in delicious cuisine, and experience the beauty of this captivating destination.', '2023-08-24', '2023-09-02', '8000', '29ef99c5-84cf-4981-bcbd-6c76f8182817.jpeg'),
(31, 'Mexico City', 'a captivating blend of ancient history and modern vibrancy. Explore archaeological sites, savor delicious cuisine, and immerse yourself in art and culture. Unforgettable vacation awaits!', '2023-07-18', '2023-07-25', '7000', '572a8edd-3841-4582-9aa6-788c711a98bf.jpeg'),
(32, 'Jerusalem', 'a city of ancient history and profound spirituality. Explore iconic religious sites, embrace the cultural richness, and experience a unique connection to the past. Unforgettable vacation awaits!', '2023-07-11', '2023-07-20', '9000', '023e2fc2-f491-45f5-b0d9-53e8165de4e3.jpeg'),
(33, 'Paris', 'the City of Lights, known for its iconic landmarks, art treasures, and romantic ambiance. Immerse yourself in its charm, savor French cuisine, and create unforgettable memories.', '2023-09-20', '2023-09-23', '4000', '4d5a06c5-0d61-4ba2-87c5-983867b78e34.jpeg'),
(34, 'New York', 'Iconic skyline, diverse culture, and endless entertainment. Explore landmarks, savor culinary delights, and embrace the vibrant energy.', '2023-10-03', '2023-10-10', '6000', '2981a7e1-f0a2-4aec-8ea2-0ee538eacbab.jpeg'),
(35, 'India', 'Rich heritage, vibrant traditions, and unforgettable experiences. Explore historical sites, savor diverse cuisine, and embrace the enchanting culture.', '2023-11-01', '2023-11-07', '7500', '41614478-a2db-444f-a07d-a5426e055148.jpeg'),
(36, 'Maldives', 'Tropical paradise with pristine beaches, turquoise waters, and incredible marine life. Unforgettable vacation awaits.', '2024-02-08', '2024-02-16', '9000', '6fa6f917-3970-4f41-8296-12d4de15a71c.jpeg'),
(37, 'Cancun', 'a tropical paradise on Mexico\'s Yucatan Peninsula, is renowned for its pristine white-sand beaches, crystal-clear turquoise waters, and vibrant nightlife.', '2024-03-13', '2024-03-19', '8700', '7e1ba41b-8fd2-4f7c-a9b2-4e88cf2b8154.jpeg'),
(38, 'Amsterdam', 'Picturesque canals, rich culture, and vibrant atmosphere. Explore museums, ride bikes, and embrace the city\'s charm.', '2023-08-04', '2023-08-10', '3400', '8cc62ffc-99d7-4fe2-b270-3cf3dc6665a1.jpg'),
(39, 'Venecia', 'The best place.', '2023-07-15', '2023-07-22', '8900', 'adb0cb4f-5c03-413e-9325-c369fcde72bd.jpg'),
(40, 'Dubai', 'a dazzling gem in the heart of the United Arab Emirates, is a city that effortlessly blends modernity with traditional Arabian charm. Its skyline is a testament to architectural marvels.', '2023-07-09', '2023-07-12', '4390', 'e6e1ba66-9adc-4c47-81d3-f7e4804bb5d5.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`role`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
