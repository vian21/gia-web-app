-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 01, 2021 at 03:25 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `comment` text NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `postId`, `user`, `comment`, `time`) VALUES
(1, 1, 1, 'tes 1', '2021-06-14 23:00:00'),
(2, 1, 1, 'test 2', '2021-06-12 16:16:00'),
(3, 1, 1, 'tes 3', '2021-06-12 16:16:00'),
(4, 1, 1, 'test 4', '2021-06-12 16:16:00'),
(5, 1, 1, 'test 5', '2021-06-12 16:16:00'),
(6, 1, 1, 'test 6', '2021-06-12 16:16:00'),
(7, 1, 1, 'test 7', '2021-06-12 16:16:00'),
(8, 1, 1, 'test 8', '2021-06-12 16:20:00'),
(9, 1, 1, 'test 9', '2021-06-12 16:20:00'),
(10, 1, 1, 'test 10', '2021-06-12 16:20:00'),
(11, 1, 1, 'test 11', '2021-06-12 16:20:00'),
(12, 1, 1, 'test 12', '2021-06-12 16:20:00'),
(13, 3, 1, 'Hell', '2021-06-12 16:20:00'),
(14, 3, 1, 'This is cool', '2021-06-12 16:20:00'),
(15, 1, 1, 'it works', '2021-06-14 15:16:00'),
(16, 1, 1, 'it works', '2021-06-14 15:16:00'),
(17, 1, 1, 'Cool bro', '2021-06-14 15:16:00'),
(18, 3, 1, 'Test', '2021-06-14 15:16:00');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `likedBy` mediumtext NOT NULL,
  `likes` int(11) NOT NULL,
  `location` text NOT NULL,
  `attachments` text NOT NULL,
  `text` text NOT NULL,
  `type` int(11) NOT NULL,
  `comments` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user`, `time`, `likedBy`, `likes`, `location`, `attachments`, `text`, `type`, `comments`) VALUES
(1, 1, '2021-06-26 19:50:10', '[1]', 15, 'Ontario, Ottawa', '[\"defaultIcon.png\"]', 'Hello world I am on GIA app', 1, 'cool'),
(3, 2, '2021-06-18 03:28:31', '[1]', 110, 'Ontario,orleans', '[\"defaultIcon.png\",\"defaultIcon.png\",\"defaultIcon.png\"]', '', 1, 'yet another post'),
(6, 2, '2021-06-16 22:35:41', '[1]', 110, 'Ontario,orleans', '[\"defaultIcon.png\",\"defaultIcon.png\",\"defaultIcon.png\"]', '', 1, 'yet another post'),
(7, 3, '2021-06-26 19:50:19', '[]', 109, '', '[\"defaultIcon.png\",\"defaultIcon.png\",\"defaultIcon.png\"]', '', 1, 'yet another post');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `location` text NOT NULL,
  `date` datetime NOT NULL,
  `attachments` text NOT NULL,
  `type` int(11) NOT NULL,
  `text` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `user`, `location`, `date`, `attachments`, `type`, `text`, `time`) VALUES
(1, 1, 'Ontario, orleans 2B', '2021-06-20 00:00:00', '[{\"image\":\"defaultIcon.png\",\"text\":\"hellol\"}]', 1, 'Hello wordl I am using the Gia app. This is my first status and it is really long to see how far it can spread', '0000-00-00 00:00:00'),
(2, 2, 'Bujumbura', '2021-06-20 00:00:00', '[{\"text\":\"hello world\",\"image\":\"defaultIcon.png\"},{\"text\":\"Finally made it through school\",\"image\":\"gialogo.png\"},{\"text\":\"memories\",\"image\":\"long.webp\"}]', 1, '', '0000-00-00 00:00:00'),
(3, 1, '', '2021-06-20 00:00:00', '', 0, 'Hello world Hello world Hello world \r\nHello world \r\nHello world ', '0000-00-00 00:00:00'),
(4, 1, 'Ontario, orleans 2B', '2021-06-20 00:00:00', '', 0, 'Hello wordl I am using the Gia app. This is my first status and it is really long to see how far it can spread', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `contacts` mediumtext NOT NULL,
  `email` text NOT NULL,
  `profilePicture` text NOT NULL,
  `password` text NOT NULL,
  `idNumber` int(11) NOT NULL,
  `DOB` date NOT NULL,
  `gender` int(11) NOT NULL,
  `accountActive` int(11) NOT NULL,
  `activationCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `contacts`, `email`, `profilePicture`, `password`, `idNumber`, `DOB`, `gender`, `accountActive`, `activationCode`) VALUES
(1, 'Patrick Igiraneza', '[{\"app\":\"whatsapp\",\"value\":\"+257 68683843\"},{\"app\":\"Instagram\",\"value\":\"patrick31\"},{\"app\":\"Facebook\",\"value\":\"patrick7\"},{\"app\":\"SnapChat\",\"value\":\"snapfox31\"}]', 'igiranezapatrick31@gmail.com', '', '$2a$12$Ba7OFANlgqi5LOttTA0aAOa3hqkxW90hzdA5FFPxa065Hxr3xRfwu', 15026, '2003-07-31', 0, 1, 445),
(2, 'Hiba Mohammed Al Sinawi', '', 'hiba@gmail.com', '', '$2b$12$Wiqr43b/fSBK8OOZx0g/0OTv/7J5hfb6r7jgBRip6g0H.2ZFxywym', 16016, '0000-00-00', 0, 1, 9886),
(3, 'abel mugishawimana', '', 'abel@gmail.com', '', '$2b$12$J4/z2n4orhAaTQMAPZ.g2OM3MOP0bWNewejfrTYD4Cc4KqzWJa5Aa', 15030, '2003-03-10', 0, 1, 4314),
(4, 'Ton Ly Hoang', '', 'ton@gmail.com', '', '$2b$12$tOP6Ht2y.lAdARk/VbQxmeDD75vSoZ78r21R2dZChUmq4DA39492C', 6969, '0000-00-00', 0, 1, 6738),
(5, 'Briella', '[{\"app\":\"whatsapp\",\"value\":\"795873749834\"},{\"app\":\"Instagram\",\"value\":\"Brie257\"},{\"app\":\"Facebook\",\"value\":\"\"},{\"app\":\"SnapChat\",\"value\":\"\"}]', 'briella@gmail.com', '', '$2b$12$CURoAYYmiEbvvIULyHYPd.LvqXxRxhjroYKDjTlwtoyZKP8HDjFB6', 15028, '2004-12-11', 1, 1, 2257);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
