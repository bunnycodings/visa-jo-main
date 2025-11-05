-- ============================================
-- VisaJo Database Schema
-- Complete setup file for MySQL/MariaDB
-- ============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ============================================
-- Table: users
-- Stores admin users for the dashboard
-- ============================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL DEFAULT 'admin',
  `permissions` TEXT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`),
  INDEX `idx_role` (`role`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: visas
-- Stores visa information for all countries
-- ============================================
CREATE TABLE IF NOT EXISTS `visas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `name_ar` VARCHAR(255) NULL,
  `country` VARCHAR(50) NOT NULL,
  `category` ENUM('travel', 'schengen') NOT NULL DEFAULT 'travel',
  `requirements` TEXT NOT NULL,
  `requirements_ar` TEXT NULL,
  `processing_time` VARCHAR(255) NOT NULL,
  `processing_time_ar` VARCHAR(255) NULL,
  `validity` VARCHAR(255) NOT NULL,
  `validity_ar` VARCHAR(255) NULL,
  `fees` TEXT NOT NULL,
  `description` TEXT NULL,
  `description_ar` TEXT NULL,
  `notes` TEXT NULL,
  `notes_ar` TEXT NULL,
  `embassy_info` TEXT NULL,
  `embassy_info_ar` TEXT NULL,
  `embassy_appointment` TEXT NULL,
  `embassy_appointment_ar` TEXT NULL,
  `main_requirements` TEXT NULL,
  `main_requirements_ar` TEXT NULL,
  `visa_types` TEXT NULL,
  `visa_types_ar` TEXT NULL,
  `hero_image` VARCHAR(500) NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_country` (`country`),
  INDEX `idx_category` (`category`),
  INDEX `idx_name` (`name`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: site_content
-- Stores editable website content (hero, about, services, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS `site_content` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `content_key` VARCHAR(50) NOT NULL UNIQUE,
  `content_data` LONGTEXT NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_content_key` (`content_key`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: contact_messages
-- Stores contact form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'read', 'replied', 'archived') NOT NULL DEFAULT 'new',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: uploaded_images
-- Stores uploaded images (base64 encoded)
-- ============================================
CREATE TABLE IF NOT EXISTS `uploaded_images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `image_id` VARCHAR(255) NOT NULL UNIQUE,
  `image_data` LONGTEXT NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_image_id` (`image_id`),
  INDEX `idx_image_id` (`image_id`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Default Admin User
-- Password: visajoadmin123 (Please change after first login!)
-- ============================================
-- Note: The password hash is generated using bcrypt
-- You can generate a new hash using: node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('yourpassword', 10).then(console.log);"
-- 
-- Default admin credentials:
-- Email: admin@visaconsulting.com
-- Password: visajoadmin123
-- 
-- To insert manually, use:
-- INSERT INTO users (email, password, name, role, permissions, is_active, created_at, updated_at)
-- VALUES ('admin@visaconsulting.com', '$2a$10$...', 'Admin User', 'admin', '["read","write","delete","admin"]', 1, NOW(), NOW());
-- 
-- The auto-init script will create this automatically if it doesn't exist.

-- ============================================
-- Notes:
-- ============================================
-- 1. The application includes an auto-initialization script that will:
--    - Create the admin user if it doesn't exist
--    - Populate default site content (hero, about, services, etc.)
--    - Insert default visa data for all countries
-- 
-- 2. JSON fields (requirements, fees, visa_types, etc.) are stored as TEXT
--    and should be parsed/stringified in application code
-- 
-- 3. Arabic fields (name_ar, description_ar, etc.) support RTL content
-- 
-- 4. All timestamps use DATETIME with automatic updates
-- 
-- 5. The database uses utf8mb4 charset to support emojis and special characters
-- 
-- 6. To reset the database, you can drop all tables and re-run this script:
--    DROP TABLE IF EXISTS uploaded_images;
--    DROP TABLE IF EXISTS contact_messages;
--    DROP TABLE IF EXISTS site_content;
--    DROP TABLE IF EXISTS visas;
--    DROP TABLE IF EXISTS users;
-- 
-- ============================================

