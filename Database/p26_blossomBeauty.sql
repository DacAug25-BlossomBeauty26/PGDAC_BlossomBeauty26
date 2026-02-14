-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: p26_blossombeauty
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `area_id` int NOT NULL AUTO_INCREMENT,
  `area_name` varchar(45) NOT NULL,
  `city_id` int NOT NULL,
  PRIMARY KEY (`area_id`),
  KEY `cityIdFk_idx` (`city_id`),
  CONSTRAINT `cityIdFk` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'GOKHALENAGAR',1),(2,'DADAR',2);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brand_id` bigint NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) NOT NULL,
  `discount` int DEFAULT '0',
  PRIMARY KEY (`brand_id`),
  UNIQUE KEY `brand_name` (`brand_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Pilgrim',10),(2,'LorealParis',5),(3,'Lakme',25),(4,'Dove',30);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `total_amount` decimal(10,2) DEFAULT '0.00',
  `discount_type` varchar(20) DEFAULT NULL,
  `discount_value` decimal(10,2) DEFAULT '0.00',
  `final_amount` decimal(10,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `coupon_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (21,3,2725.00,NULL,0.00,2725.00,'2026-02-01 18:41:43','2026-02-01 18:41:43',NULL),(26,6,9000.00,NULL,0.00,9000.00,'2026-02-02 13:57:02','2026-02-02 13:57:02',NULL),(29,7,4500.00,NULL,0.00,4500.00,'2026-02-03 05:44:38','2026-02-03 05:44:38',NULL),(30,7,0.00,NULL,0.00,0.00,'2026-02-03 05:44:38','2026-02-03 05:44:38',NULL),(36,10,4500.00,NULL,0.00,4500.00,'2026-02-03 21:26:00','2026-02-03 21:26:00',NULL),(37,10,0.00,NULL,0.00,0.00,'2026-02-03 21:26:00','2026-02-03 21:26:00',NULL),(41,14,5300.00,NULL,0.00,5300.00,'2026-02-04 05:10:00','2026-02-04 05:10:00',NULL),(42,15,0.00,NULL,0.00,0.00,'2026-02-04 05:11:35','2026-02-04 05:11:35',NULL),(43,15,800.00,NULL,0.00,800.00,'2026-02-04 05:11:35','2026-02-04 05:11:35',NULL),(45,16,4500.00,NULL,0.00,4500.00,'2026-02-04 05:25:48','2026-02-04 05:25:48',NULL),(47,17,0.00,NULL,0.00,0.00,'2026-02-04 07:17:24','2026-02-04 07:17:24',NULL),(49,1,0.00,NULL,0.00,0.00,'2026-02-11 07:11:22','2026-02-11 07:11:22',NULL),(50,2,4500.00,NULL,0.00,4500.00,'2026-02-11 08:15:43','2026-02-11 08:15:43',NULL),(53,19,0.00,NULL,0.00,0.00,'2026-02-11 16:38:56','2026-02-11 16:38:56',NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `cart_item_id` bigint NOT NULL AUTO_INCREMENT,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_item_id`),
  KEY `fk_cart` (`cart_id`),
  CONSTRAINT `fk_cart` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (45,21,7,'Lakme Eye Kajal',545.00,5,2725.00,'2026-02-01 18:55:33','2026-02-01 18:55:33'),(56,26,2,'Lakme Lipstick',4500.00,1,4500.00,'2026-02-02 13:57:34','2026-02-02 13:57:34'),(57,26,2,'Lakme Lipstick',4500.00,1,4500.00,'2026-02-02 13:57:34','2026-02-02 13:57:34'),(63,29,2,'Lakme Lipstick',4500.00,1,4500.00,'2026-02-03 05:44:39','2026-02-03 05:44:39'),(69,36,2,'Lakme Lipstick',4500.00,1,4500.00,'2026-02-03 21:26:01','2026-02-03 21:26:01'),(73,41,3,'Dove Bodywash',800.00,1,800.00,'2026-02-04 05:10:06','2026-02-04 05:10:06'),(74,43,3,'Dove Bodywash',800.00,1,800.00,'2026-02-04 05:11:35','2026-02-04 05:11:35'),(75,41,2,'Lakme Lipstick',4500.00,1,4500.00,'2026-02-04 05:20:40','2026-02-04 05:20:40'),(78,45,2,'Lakme Lipstick',4500.00,1,4500.00,'2026-02-04 06:20:20','2026-02-04 06:20:20'),(89,50,2,'Lakme Lipstick',4500.00,1,4500.00,'2026-02-11 10:21:48','2026-02-11 10:21:48');
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Bodycare'),(2,'Haircare'),(4,'Makeup'),(1,'Skincare');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(45) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `cityName_UNIQUE` (`city_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (2,'MUMBAI'),(1,'PUNE');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon` (
  `coupon_id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount_type` varchar(20) NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `min_cart_value` decimal(10,2) DEFAULT '0.00',
  `expiry_date` date DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`coupon_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` VALUES (1,'WELCOME10','PERCENTAGE',10.00,1000.00,'2026-05-05',1),(2,'FLAT50','FIXED',50.00,500.00,'2026-02-05',1),(3,'NEWYEAR20','PERCENTAGE',20.00,5000.00,'2027-01-01',1),(4,'SUMMER100','FIXED',100.00,6000.00,'2026-03-14',1);
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `fk_order_items_order` (`order_id`),
  KEY `fk_order_items_product` (`product_id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (2,25,2,'Lakme Lipstick',4500.00,1,4500.00),(3,25,4,'Pilgrim Facewash',540.00,1,540.00),(6,27,2,'Lakme Lipstick',4500.00,1,4500.00),(7,28,2,'Lakme Lipstick',4500.00,1,4500.00),(10,30,1,'TotalRepair Shampoo',500.00,1,500.00),(15,30,2,'Lakme Lipstick',4500.00,1,4500.00),(33,46,1,'TotalRepair Shampoo',500.00,3,1500.00),(34,46,2,'Lakme Lipstick',4500.00,1,4500.00),(35,47,1,'TotalRepair Shampoo',500.00,2,1000.00),(36,48,2,'Lakme Lipstick',4500.00,1,4500.00),(37,49,2,'Lakme Lipstick',4500.00,1,4500.00),(38,50,2,'Lakme Lipstick',4500.00,1,4500.00),(39,51,3,'Dove Bodywash',800.00,1,800.00),(40,51,1,'TotalRepair Shampoo',500.00,1,500.00),(41,51,4,'Pilgrim Facewash',540.00,1,540.00),(42,52,2,'Lakme Lipstick',4500.00,1,4500.00),(43,52,3,'Dove Bodywash',800.00,1,800.00),(44,53,3,'Dove Bodywash',800.00,2,1600.00),(45,53,2,'Lakme Lipstick',4500.00,1,4500.00),(46,54,2,'Lakme Lipstick',4500.00,6,27000.00),(47,54,1,'TotalRepair Shampoo',500.00,1,500.00),(48,55,4,'Pilgrim Facewash',540.00,2,1080.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `final_amount` decimal(10,2) NOT NULL,
  `order_status` enum('CREATED','CONFIRMED','DISPATCHED','DELIVERED','CANCELLED') NOT NULL DEFAULT 'CREATED',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `payment_method` varchar(20) NOT NULL DEFAULT 'COD',
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_user` (`user_id`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (25,2,5040.00,5040.00,'DISPATCHED','2026-02-01 18:29:23','2026-02-04 05:28:57','COD'),(27,2,4500.00,4050.00,'CANCELLED','2026-02-01 18:30:54','2026-02-04 08:02:35','COD'),(28,3,4500.00,4050.00,'DELIVERED','2026-02-01 18:41:40','2026-02-02 13:47:15','COD'),(30,2,5000.00,4950.00,'CREATED','2026-02-02 11:49:58','2026-02-02 11:49:58','COD'),(46,1,6000.00,5900.00,'CANCELLED','2026-02-03 23:22:32','2026-02-11 07:11:59','COD'),(47,1,1000.00,900.00,'CANCELLED','2026-02-04 04:35:33','2026-02-04 04:35:58','COD'),(48,16,4500.00,4050.00,'DISPATCHED','2026-02-04 05:25:46','2026-02-04 05:29:01','COD'),(49,17,4500.00,4050.00,'CANCELLED','2026-02-04 07:17:01','2026-02-04 07:18:12','COD'),(50,17,4500.00,4050.00,'CREATED','2026-02-04 07:17:14','2026-02-04 07:17:14','COD'),(51,2,1840.00,1656.00,'CREATED','2026-02-04 08:59:04','2026-02-04 08:59:04','COD'),(52,1,5300.00,5300.00,'CREATED','2026-02-11 07:11:19','2026-02-11 07:11:19','COD'),(53,2,6100.00,5490.00,'CANCELLED','2026-02-11 08:15:41','2026-02-11 08:15:56','COD'),(54,19,27500.00,27500.00,'CREATED','2026-02-11 14:43:30','2026-02-11 14:43:30','COD'),(55,19,1080.00,972.00,'CANCELLED','2026-02-11 16:38:42','2026-02-11 16:39:17','COD');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `brand_id` bigint NOT NULL,
  `subcategory_id` bigint NOT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `brand_id` (`brand_id`),
  KEY `subcategory_id` (`subcategory_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`subcategory_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'TotalRepair Shampoo','anti dandruff shampoo for hair fall control',500.00,4,2,1,'ACTIVE','2026-01-30 07:38:27','2026-02-04 04:09:19','http://localhost:8082/uploads/images/shampoo.jpg'),(2,'Lakme Lipstick','Matte Revolution Refillable Lipstick (Look Of Love Collection)',4500.00,100,3,2,'ACTIVE','2026-01-30 07:41:37','2026-02-04 04:33:03','http://localhost:8082/uploads/images/lipstick.jpg'),(3,'Dove Bodywash','Dove Deeply Nourishing Body Wash|| With Moisturisers For Softer|| Smoother Skin|| For All Skin Type|| 825 ml',800.00,101,4,3,'ACTIVE','2026-01-30 07:46:40','2026-02-04 04:33:03','http://localhost:8082/uploads/images/bodywash.jpg'),(4,'Pilgrim Facewash','Pilgrim Korean Rice Water Hydra Glow Facewash| Hydrated Glowy Skin| Korean Glow| Gentle & Non-Drying| Niacinamide| Hyaluronic Acid (100ml) acne removal',540.00,60,1,4,'ACTIVE','2026-01-30 07:48:20','2026-02-04 04:33:03','http://localhost:8082/uploads/images/facewash.jpg'),(7,'Lakme Eye Kajal','Lakme 9 to 5 Eyeconic Kajal, Smudgeproof, Waterproof, lasts upto 24 Hrs, Black, 0.35gm',545.00,80,3,2,'ACTIVE','2026-02-01 18:39:13','2026-02-04 04:33:03','http://localhost:8082/uploads/images/kajal.jpg'),(8,'Dove Body Scrub','Dove Exfoliating Body Polish Scrub for Delicate & Sensitive Skin with Oatmeal & Calendula Oil, Gently Exfoliates and Moisturizes to Reveal Instantly Soft, Smooth & Healthy Skin, Naturally Derived Ingredients, Sulfate-Free, Floral Fragrance, 298g',780.00,12,4,3,'ACTIVE','2026-02-01 18:48:34','2026-02-04 04:33:03','http://localhost:8082/uploads/images/scrub.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(30) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(2,'CUSTOMER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `subcategory_id` bigint NOT NULL AUTO_INCREMENT,
  `subcategory_name` varchar(50) NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`subcategory_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Shampoo',2),(2,'Lipstick',4),(3,'Bodywash',3),(4,'Facewash',1),(5,'Facecream',1);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(75) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `status` enum('ACTIVE','BLOCKED') DEFAULT 'ACTIVE',
  `role_id` int NOT NULL DEFAULT '2',
  `area_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `areaIdFk_idx` (`area_id`),
  KEY `roleFk_idx` (`role_id`),
  CONSTRAINT `areaIdFk` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `roleFk` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Akanksha','Gulekar','akanksha123','akanksha123','akanksha@gmail.com','7028180179','ACTIVE',2,1,'2026-01-30 13:16:48'),(2,'Smita','Gulekar','smita123','smita123','smita@gmail.com','9860981673','ACTIVE',2,1,'2026-01-30 13:25:56'),(3,'Aditya','Gulekar','aaditya123','Aaditya@123','aaditya@gmail.com','7481249753','ACTIVE',2,2,'2026-01-31 07:23:16'),(5,'Admin','Admin','admin123','Admin@123','admin@gmail.com','00000000000','ACTIVE',1,1,'2026-02-01 13:11:36'),(8,'Subhash','Gulekar','subhash@123','Subhash@123','subhash@123','7896541230','ACTIVE',2,2,'2026-02-03 06:22:42'),(14,'Shiva','Patil','shiva123','Shiva@123','shiva@gmail.com','7896541230','ACTIVE',2,2,'2026-02-04 05:09:03'),(16,'Sakshi','Gulekar','sakshi','Sakshi@123','sakshi@gmail.com','7896412301','ACTIVE',2,2,'2026-02-04 05:23:50'),(17,'Shana','Warsi','Shana123','Shana@123','inbox.abc@gmail.com','7896541230','ACTIVE',2,2,'2026-02-04 07:15:57'),(18,'Shivay','Patil','shiva@123','Shiva@123','shivay@gmail.com','7896541230','ACTIVE',2,2,'2026-02-04 08:57:21'),(19,'Ganesh','Bappa','bappa123','bappa@123','bappa@gmail.com','7896541230','ACTIVE',2,2,'2026-02-11 11:58:16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`wishlist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (8,19,2),(9,19,1),(10,19,4),(12,19,8);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-14 16:47:57
