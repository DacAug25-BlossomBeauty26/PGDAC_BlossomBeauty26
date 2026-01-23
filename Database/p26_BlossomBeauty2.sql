-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
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
  CONSTRAINT `cityIdFk` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `brandId` int NOT NULL AUTO_INCREMENT,
  `brandName` varchar(45) NOT NULL,
  `brandDiscId` int NOT NULL,
  PRIMARY KEY (`brandId`),
  UNIQUE KEY `brandName_UNIQUE` (`brandName`),
  KEY `brandDiscIdFk_idx` (`brandDiscId`),
  CONSTRAINT `brandDiscIdFk` FOREIGN KEY (`brandDiscId`) REFERENCES `branddiscount` (`brandDiscId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Lakme',1),(2,'Dove',2),(3,'dot&key',1);
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branddiscount`
--

DROP TABLE IF EXISTS `branddiscount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branddiscount` (
  `brandDiscId` int NOT NULL AUTO_INCREMENT,
  `discountType` enum('PERCENTAGE','FIXED') NOT NULL,
  `discountValue` decimal(10,2) NOT NULL,
  `startDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate` timestamp NOT NULL,
  `status` enum('ACTIVE','INACTIVE','EXPIRED') NOT NULL DEFAULT 'ACTIVE',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`brandDiscId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branddiscount`
--

LOCK TABLES `branddiscount` WRITE;
/*!40000 ALTER TABLE `branddiscount` DISABLE KEYS */;
INSERT INTO `branddiscount` VALUES (1,'FIXED',500.00,'2026-01-22 07:33:30','2026-01-23 09:00:00','ACTIVE','2026-01-22 07:33:30'),(2,'PERCENTAGE',10.00,'2026-01-22 07:34:02','2026-01-23 09:00:00','ACTIVE','2026-01-22 07:34:02');
/*!40000 ALTER TABLE `branddiscount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cartId`),
  KEY `userIDFK_idx` (`userId`),
  CONSTRAINT `userIDFK` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,'2026-01-22 09:21:38');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitems` (
  `cartItemId` int NOT NULL AUTO_INCREMENT,
  `cartId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `STATUS` enum('ACTIVE','ORDERED','REMOVED') DEFAULT 'ACTIVE',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cartItemId`),
  KEY `cartIDFK_idx` (`cartId`),
  KEY `productID_FK_idx` (`productId`),
  CONSTRAINT `cartIDFK` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_ID_FK` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitems`
--

LOCK TABLES `cartitems` WRITE;
/*!40000 ALTER TABLE `cartitems` DISABLE KEYS */;
INSERT INTO `cartitems` VALUES (1,1,1,2,'ACTIVE','2026-01-22 09:22:09'),(2,1,2,2,'ACTIVE','2026-01-22 09:22:09');
/*!40000 ALTER TABLE `cartitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(45) NOT NULL,
  PRIMARY KEY (`categoryId`),
  UNIQUE KEY `categoryName_UNIQUE` (`categoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Bodycare'),(4,'Haircare'),(3,'Makeup'),(1,'Skincare');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
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
-- Table structure for table `discountonorder`
--

DROP TABLE IF EXISTS `discountonorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discountonorder` (
  `discountOnOrderId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `discountType` enum('FIXED','PERCENTAGE') NOT NULL,
  `discountValue` decimal(10,2) DEFAULT NULL,
  `discountAmount` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `startDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`discountOnOrderId`),
  KEY `FK_ORDER_ID_idx` (`orderId`),
  CONSTRAINT `FK_ORDER_ID` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discountonorder`
--

LOCK TABLES `discountonorder` WRITE;
/*!40000 ALTER TABLE `discountonorder` DISABLE KEYS */;
INSERT INTO `discountonorder` VALUES (1,1,'FIXED',500.00,500.00,'2026-01-22 09:39:56','2026-01-22 09:39:56','2026-01-24 09:39:56');
/*!40000 ALTER TABLE `discountonorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordereditems`
--

DROP TABLE IF EXISTS `ordereditems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordereditems` (
  `ordereditemId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int DEFAULT '1',
  `pricePerUnit` decimal(10,2) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ordereditemId`),
  KEY `FKorderId_idx` (`orderId`),
  KEY `FKproductId_idx` (`productId`),
  CONSTRAINT `FKorderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKproductId` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordereditems`
--

LOCK TABLES `ordereditems` WRITE;
/*!40000 ALTER TABLE `ordereditems` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordereditems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `subTotal` decimal(10,2) DEFAULT '0.00',
  `finalAmount` decimal(10,0) DEFAULT NULL,
  `paymentMethod` enum('COD','CARD','UPI') DEFAULT 'COD',
  `status` enum('PLACED','CONFIRMED','DISPATCHED','SHIPPED','DELIVERED','RETURNED') DEFAULT 'CONFIRMED',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`),
  KEY `userIDFK__idx` (`userId`),
  CONSTRAINT `userIDFK_` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1598.00,1098,'COD','CONFIRMED','2026-01-22 09:30:57');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) NOT NULL,
  `productDescription` longtext,
  `price` decimal(10,2) DEFAULT NULL,
  `stockQuantity` tinyint(1) DEFAULT '1',
  `brandId` int NOT NULL,
  `subcategoryId` int NOT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  `image` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `productDomain` enum('SKIN','HAIR','BOTH') DEFAULT NULL,
  PRIMARY KEY (`productId`),
  KEY `brandIdFk_idx` (`brandId`),
  KEY `subCategoryIdFk_idx` (`subcategoryId`),
  CONSTRAINT `brandIdFk` FOREIGN KEY (`brandId`) REFERENCES `brand` (`brandId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subCategoryIdFk` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategory` (`subcategoryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Matte Lipstick','Product Overview\nIndulge in rich, long-lasting color with this Velvet Matte Lipstick, crafted to deliver intense pigmentation and a smooth, lightweight feel. The creamy formula glides effortlessly onto the lips, providing a flawless matte finish without causing dryness or discomfort. Each swipe delivers bold color while keeping lips soft and comfortable throughout the day.\n\nNourishing Formula\nFormulated with nourishing ingredients such as Vitamin E, Shea Butter, and Jojoba Oil, this lipstick helps retain moisture and prevents lips from feeling dry or cracked. The blend of conditioning agents ensures your lips stay hydrated while maintaining a refined, velvety appearance.\n\nLong-Lasting Wear\nThe smudge-resistant and transfer-proof formula is designed to last for hours, making it ideal for long days, special occasions, or everyday wear. The color remains vibrant and fresh without frequent touch-ups, allowing you to enjoy confident, all-day elegance.\n\nShade Range & Finish\nAvailable in a wide range of carefully curated shades, this lipstick complements every skin tone and suits multiple makeup styles, from natural daytime looks to bold evening glam. Its versatile texture allows you to build coverage from subtle to dramatic with ease.\n\nSafety & Shelf Life\nDermatologically tested and cruelty-free, this lipstick is suitable for all skin types. It has a shelf life of 36 months from the manufacturing date and is best used within 24 months after opening, ensuring long-lasting quality and performance.',799.00,1,1,5,'ACTIVE','C:/images/lipstick1.jpg','2026-01-22 08:02:26','SKIN'),(2,'BrightBeauty Suncreen','Product Overview\nProtect and nourish your skin with Dot & Key Sunscreen, thoughtfully formulated to provide broad-spectrum protection against harmful UVA and UVB rays. Its lightweight, non-greasy texture blends seamlessly into the skin, leaving no white cast and ensuring a comfortable, breathable finish suitable for daily use.\n\nAdvanced Sun Protection Formula\nPowered with effective UV filters and skin-loving actives, this sunscreen helps shield the skin from sun damage, tanning, and premature aging. The formula works to strengthen the skin barrier while protecting it from environmental stressors caused by prolonged sun exposure.\n\nHydration & Skin Care Benefits\nInfused with hydrating and soothing ingredients, Dot & Key Sunscreen helps maintain the skin’s moisture balance throughout the day. It keeps the skin feeling soft, fresh, and calm, making it ideal even for sensitive or sun-exposed skin.\n\nTexture & Finish\nDesigned for everyday wear, the sunscreen has a lightweight, fast-absorbing texture that layers well under makeup. It provides a natural, non-sticky finish without clogging pores, making it suitable for all skin types, including oily and acne-prone skin.\n\nSafety & Shelf Life\nDermatologically tested and cruelty-free, Dot & Key Sunscreen is safe for regular use. It has a shelf life of 36 months from the manufacturing date and is recommended to be used within 24 months after opening to ensure optimal efficacy and protection.',845.00,1,3,1,'ACTIVE','C:/images/sunscreen.jpg','2026-01-22 08:59:15','SKIN');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimages`
--

DROP TABLE IF EXISTS `productimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimages` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `imageUrl` varchar(500) NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `productId_FK_idx` (`productId`),
  CONSTRAINT `productId_FK` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (1,1,'C:/images/lipstick1.jpg'),(2,2,'C:/images/sunscreen.jpg');
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productrecommendationtag`
--

DROP TABLE IF EXISTS `productrecommendationtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productrecommendationtag` (
  `productId` int NOT NULL,
  `tagType` enum('SKIN_TYPE','SKIN_CONCERN','HAIR_TYPE','HAIR_CONCERN') NOT NULL,
  `tagValue` enum('OILY','DRY','COMBINATION','SENSITIVE','ACNE','PIGMENTATION','PIMPLE','DULLNESS','STRAIGHT','WAVY','CURLY','HAIRFALL','DANDRUFF','FRIZZ') NOT NULL,
  KEY `fk_prt_product` (`productId`),
  CONSTRAINT `fk_prt_product` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productrecommendationtag`
--

LOCK TABLES `productrecommendationtag` WRITE;
/*!40000 ALTER TABLE `productrecommendationtag` DISABLE KEYS */;
INSERT INTO `productrecommendationtag` VALUES (1,'SKIN_TYPE','OILY'),(1,'SKIN_CONCERN','ACNE');
/*!40000 ALTER TABLE `productrecommendationtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(2,'USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `subcategoryId` int NOT NULL AUTO_INCREMENT,
  `subcategoryName` varchar(45) NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`subcategoryId`),
  KEY `categoryIdFk_idx` (`categoryId`),
  CONSTRAINT `categoryIdFk` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Sunscreen',1),(2,'Toner',1),(3,'Bodywash',2),(4,'Bodyscrub',2),(5,'Lipstick',3),(6,'Mascara',3),(7,'Shampoo',4),(8,'HairOil',4);
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(75) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `status` enum('ACTIVE','BLOCKED') DEFAULT 'ACTIVE',
  `role_id` int NOT NULL,
  `area_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `skin_type` enum('DRY','OILY','SENSITIVE','COMBINATION') NOT NULL,
  `hair_type` enum('STRAIGHT','WAVY','CURLY','COILY') NOT NULL,
  `skin_concern` enum('ACNE','PIMPLE','WRINKLES','PIGMENTATION') NOT NULL,
  `hair_concern` enum('FRIZZ','DRYNESS','DANDRUFF','HAIRFALL') NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `roleIdFk_idx` (`role_id`),
  KEY `areaIdFk_idx` (`area_id`),
  CONSTRAINT `areaIdFk` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roleIdFk` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Akanksha','akanksha@123','akanksha@gmail.com','7028180179','ACTIVE',2,1,'2026-01-22 07:46:20','DRY','WAVY','ACNE','FRIZZ',NULL,NULL),(2,'Sakshi','sakshi@123','sakshi@gmail.com','7854123690','ACTIVE',1,1,'2026-01-22 10:42:17','DRY','WAVY','ACNE','FRIZZ',NULL,NULL),(3,'Sana','sana@123','sana@gmail.com','9874563210','ACTIVE',2,2,'2026-01-22 10:42:17','OILY','CURLY','PIMPLE','DRYNESS',NULL,NULL),(4,'Sakshee','12345','sakshee@gmail.com','9876543210','ACTIVE',1,2,'2026-01-22 18:30:00','DRY','STRAIGHT','ACNE','FRIZZ',NULL,NULL),(6,'Fatima','fatima@123','fatima@gmail.com','9876543210','ACTIVE',1,2,'2026-01-22 18:30:00','DRY','STRAIGHT','ACNE','FRIZZ',NULL,NULL),(7,'Shifa','shifa123','shifa@gmail.com','9876543210','ACTIVE',1,2,'2026-01-22 18:30:00','DRY','STRAIGHT','ACNE','FRIZZ',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlistId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `status` enum('ACTIVE','REMOVED') DEFAULT 'ACTIVE',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`wishlistId`),
  KEY `FK_USERID_idx` (`userId`),
  KEY `FK_PROD_ID_idx` (`productId`),
  CONSTRAINT `FK_PROD_ID` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_USERID` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,1,1,'ACTIVE','2026-01-22 09:43:58'),(2,1,2,'ACTIVE','2026-01-22 09:44:05');
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

-- Dump completed on 2026-01-23 23:03:46
