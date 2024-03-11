# 2024_Intern_BKDN_DAC - Python Team

## Requirement Document

**Objective:**
When investors are interested in purchasing stocks, they often face numerous choices in selecting which stocks to invest in. Investors typically want to know stock price predictions to determine if the investment is worthwhile. To meet this need, the Stock Prediction website is created to provide investors with an overview, helping them make decisions easily and accurately.

This Stock Prediction website enables users to experience and share opinions on stock price predictions, fostering a diverse and rich stock prediction community.

**System Requirements:**
- **Role-based authorization:** Admin and User.
- **Admin write stock predict context.**
- **User can view and write comment about stocks.**


### Functional Requirements

#### Admin:
- **Login**
- **Dashboard:**
  - View stock list
  - View stock followed list
  - View stock information by day
  - Filter in table price
- **User profile:**
  - View admin profile
  - Update admin profile
- **Stock detail:**
  - View stock detail
  - View change price
  - Follow stock
  - View stock prediction
  - Write comment
  - Write, update and delete predictions
- **Logout**

#### User:
- **Register and Login**
- **Dashboard:**
  - View stock list
  - View stock followed list
  - View stock information by day
  - Filter in table price
- **User profile:**
  - View admin profile
  - Update admin profile
- **Stock detail:**
  - View stock detail
  - View change price
  - Follow stock
  - View stock prediction
  - Write comment
- **Logout**


### Database Design

#### Tables:
1. **users:**
   - userid, username, password, email, fullname, type, created_at, update_at.

2. **stockprediction:**
   - predictionid, stockid, userid, date, text_prediction

3. **stocklist:**
   - stockid, symbol, company_name, company_detail, previous_close_price.

4. **stockhistory:**
   - id, stockid, date, open, high, low, close, volume.

5. **stockfollow:**
   - followid, userid, stockid.

5. **comments:**
   - commentid, userid, stockid, comment_text, created_at, update_at.
### User Interface

#### Admin:
- **Login Page**
- **Dashboard page**
- **Stock detail page**
- **User profile page**

#### User:
- **Login Page**
- **Sign Up Page**
- **Dashboard page**
- **Stock detail page**
- **User profile page**

### Technology Stack

**Programming Language:**
- **Back-end:** Python 
- **Front-end:** HTML/CSS, JavaScript

**Frameworks:**
- **Back-end:** Flask
- **Front-end:** ReactJS

**Database:**
- **MySQL**

#### Database Diagram
![Database Diagram](https://github.com/dtvn-training/2024-dn-python-stockprediction/blob/developer/Frontend/public/assets/DB.png)

### SQL Schema

-- Host: localhost    Database: stock_prediction
--

-- Table structure for table `comments`
--
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `commentid` varchar(50) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `stockid` varchar(50) NOT NULL,
  `comment_text` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentid`),
  KEY `userid` (`userid`),
  KEY `stockid` (`stockid`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`stockid`) REFERENCES `stocklist` (`stockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `stockfollow`

DROP TABLE IF EXISTS `stockfollow`;
CREATE TABLE `stockfollow` (
  `followid` varchar(50) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `stockid` varchar(50) NOT NULL,
  PRIMARY KEY (`followid`),
  KEY `userid` (`userid`),
  KEY `stockid` (`stockid`),
  CONSTRAINT `stockfollow_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  CONSTRAINT `stockfollow_ibfk_2` FOREIGN KEY (`stockid`) REFERENCES `stocklist` (`stockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `stockhistory`
--
DROP TABLE IF EXISTS `stockhistory`;
CREATE TABLE `stockhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stockid` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `open` double NOT NULL,
  `high` double NOT NULL,
  `low` double NOT NULL,
  `close` double NOT NULL,
  `volume` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stockid` (`stockid`),
  CONSTRAINT `stockhistory_ibfk_1` FOREIGN KEY (`stockid`) REFERENCES `stocklist` (`stockid`)
) ENGINE=InnoDB AUTO_INCREMENT=20521 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `stocklist`
--
DROP TABLE IF EXISTS `stocklist`;
CREATE TABLE `stocklist` (
  `stockid` varchar(50) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `company_name` varchar(60) NOT NULL,
  `company_detail` varchar(200) DEFAULT NULL,
  `previous_close_price` double NOT NULL,
  PRIMARY KEY (`stockid`),
  UNIQUE KEY `symboy` (`symbol`),
  UNIQUE KEY `symbol` (`symbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `stockprediction`
--
DROP TABLE IF EXISTS `stockprediction`;
CREATE TABLE `stockprediction` (
  `predictionid` int NOT NULL AUTO_INCREMENT,
  `stockid` varchar(50) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `text_prediction` varchar(300) NOT NULL,
  PRIMARY KEY (`predictionid`),
  KEY `userid` (`userid`),
  KEY `stockid` (`stockid`),
  CONSTRAINT `stockprediction_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  CONSTRAINT `stockprediction_ibfk_2` FOREIGN KEY (`stockid`) REFERENCES `stocklist` (`stockid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `type` varchar(15) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
