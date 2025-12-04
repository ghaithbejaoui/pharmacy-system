-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2025 at 10:15 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `expiry` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `name`, `stock`, `price`, `expiry`) VALUES
(10004, 'ashwaganda', 150, '39.00', '2030-12-27'),
(10012, 'ghaith', 100, '20.00', '2028-12-30'),
(10013, 'f', 2, '100.00', '2025-11-28'),
(10014, 'test123', 6000, '69.00', '2025-11-23'),
(10015, 'kjkjfff', 41, '49.00', '2026-01-07'),
(10016, 'haah', 150, '26.00', '2025-12-01');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `medicine_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `total_price` decimal(10,2) NOT NULL,
  `sale_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `medicine_id`, `quantity`, `total_price`, `sale_date`) VALUES
(1, 10014, 5, '345.00', '2025-11-28 19:11:23'),
(2, 10012, 1, '20.00', '2025-12-02 21:02:41'),
(3, 10004, 100, '3900.00', '2025-12-02 21:03:16'),
(4, 10012, 1, '20.00', '2025-12-02 21:06:08'),
(5, 10012, 48, '960.00', '2025-12-02 23:26:01'),
(6, 10013, 1, '100.00', '2025-12-02 23:28:29'),
(7, 10015, 5, '250.00', '2025-12-02 23:33:41'),
(8, 10014, 1, '69.00', '2025-12-02 23:37:10'),
(9, 10015, 4, '196.00', '2025-12-02 23:40:06'),
(10, 10004, 3, '117.00', '2025-12-03 12:02:46'),
(11, 10014, 500, '34500.00', '2025-12-03 12:04:22'),
(12, 10014, 50, '3450.00', '2025-12-04 21:47:23'),
(13, 10014, 400, '27600.00', '2025-12-04 21:50:45'),
(14, 10014, 13, '897.00', '2025-12-04 22:04:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','pharmacist') NOT NULL DEFAULT 'pharmacist',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `nickname`, `password_hash`, `role`, `created_at`, `updated_at`) VALUES
(2, 'ghaith1@gmail.com', 'pharma', '$2b$10$example.hash.for.password', 'pharmacist', '2025-12-02 22:46:09', '2025-12-04 21:15:04'),
(3, 'ghaith@gmail.com', 'ghaith', '$2b$10$wVScWwzdCIRWL5Yz.JpNrechTLI9pyral4.nJlWhnLjVVlltnqSay', 'admin', '2025-12-02 23:02:54', '2025-12-02 23:06:36'),
(4, 'sami@t.com', 'ddd', '$2b$10$6XCu1gzIlpy/42sFZND7Ie8D1lTXK1R7R4/M1.5it/foVE/PNrd.G', 'pharmacist', '2025-12-02 23:18:01', '2025-12-02 23:57:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nickname` (`nickname`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10017;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
