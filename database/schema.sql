-- Visa Consulting Database Schema
-- MySQL/MariaDB Database Setup
-- Run this script to create the database and all required tables
--
-- IMPORTANT: For shared hosting, you don't need CREATE DATABASE privileges.
-- Simply select your database from your hosting panel (cPanel/phpMyAdmin) 
-- and run this script. The database should already exist.
--
-- If you need to specify a database name manually, uncomment the line below
-- and replace 'your_database_name' with your actual database name:
-- USE your_database_name;

-- Note: Most hosting panels (like cPanel) automatically select your database
-- when you run SQL queries, so the USE statement may not be necessary.

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  permissions JSON DEFAULT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Visas table
CREATE TABLE IF NOT EXISTS visas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(255) NOT NULL,
  category ENUM('travel', 'schengen') NOT NULL,
  requirements JSON NOT NULL,
  processing_time VARCHAR(255) NOT NULL,
  validity VARCHAR(255) NOT NULL,
  fees JSON NOT NULL,
  description TEXT,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_country (country),
  INDEX idx_category (category),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Site content table for managing CMS content
CREATE TABLE IF NOT EXISTS site_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content_key VARCHAR(100) NOT NULL UNIQUE,
  content_data JSON NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_content_key (content_key),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Google Places cache table
CREATE TABLE IF NOT EXISTS places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  types JSON NOT NULL,
  rating DECIMAL(3, 2) DEFAULT NULL,
  user_ratings_total INT DEFAULT NULL,
  price_level INT DEFAULT NULL,
  photos JSON DEFAULT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_place_id (place_id),
  INDEX idx_active (is_active),
  INDEX idx_location (location_lat, location_lng)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Visa applications table
CREATE TABLE IF NOT EXISTS visa_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  visa_type VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  status ENUM('pending', 'in_progress', 'approved', 'rejected', 'cancelled') NOT NULL DEFAULT 'pending',
  personal_info JSON NOT NULL,
  travel_info JSON NOT NULL,
  documents JSON NOT NULL,
  notes TEXT,
  submitted_at DATETIME DEFAULT NULL,
  processed_at DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_country (country),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

