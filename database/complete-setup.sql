-- ===================================================================
-- Visa Consulting Database - Complete Setup File
-- MySQL/MariaDB Database Setup
-- ===================================================================
-- This is a comprehensive setup file that includes:
-- 1. All table schemas
-- 2. All migrations (Arabic fields, contact messages)
-- 3. All initial data (users, visas with Arabic translations)
-- 4. UAE visa recreation with complete Arabic support
--
-- IMPORTANT: For shared hosting, you don't need CREATE DATABASE privileges.
-- Simply select your database from your hosting panel (cPanel/phpMyAdmin) 
-- and run this script. The database should already exist.
--
-- If you need to specify a database name manually, uncomment the line below
-- and replace 'your_database_name' with your actual database name:
-- USE your_database_name;
-- ===================================================================

-- ===================================================================
-- PART 1: CREATE ALL TABLES
-- ===================================================================

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

-- Visas table (includes embassy information and visa types)
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
  embassy_info TEXT NULL,
  embassy_appointment TEXT NULL,
  main_requirements TEXT NULL,
  visa_types JSON NULL,
  hero_image LONGTEXT NULL,
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

-- Uploaded images table
CREATE TABLE IF NOT EXISTS uploaded_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_id VARCHAR(255) NOT NULL UNIQUE,
  image_data LONGTEXT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_image_id (image_id),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact messages table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied', 'archived') NOT NULL DEFAULT 'new',
  admin_notes TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  read_at DATETIME NULL,
  INDEX idx_status (status),
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================================================
-- PART 2: ADD ARABIC FIELDS TO VISAS TABLE (Migration)
-- ===================================================================
-- This migration adds Arabic language support for visa details
-- It's safe to run multiple times - it checks if columns exist first
-- ===================================================================

SET @dbname = DATABASE();
SET @tablename = 'visas';

-- Add name_ar column
SET @columnname = 'name_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column name_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " VARCHAR(255) NULL AFTER name;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add description_ar column
SET @columnname = 'description_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column description_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " TEXT NULL AFTER description;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add notes_ar column
SET @columnname = 'notes_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column notes_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " TEXT NULL AFTER notes;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add embassy_info_ar column
SET @columnname = 'embassy_info_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column embassy_info_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " TEXT NULL AFTER embassy_info;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add embassy_appointment_ar column
SET @columnname = 'embassy_appointment_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column embassy_appointment_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " TEXT NULL AFTER embassy_appointment;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add main_requirements_ar column
SET @columnname = 'main_requirements_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column main_requirements_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " TEXT NULL AFTER main_requirements;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add requirements_ar column
SET @columnname = 'requirements_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column requirements_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " JSON NULL AFTER requirements;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add visa_types_ar column
SET @columnname = 'visa_types_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column visa_types_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " JSON NULL AFTER visa_types;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add processing_time_ar column
SET @columnname = 'processing_time_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column processing_time_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " VARCHAR(255) NULL AFTER processing_time;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add validity_ar column
SET @columnname = 'validity_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column validity_ar already exists.';",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " VARCHAR(255) NULL AFTER validity;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Add index for better performance
SET @indexname = 'idx_name_ar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (index_name = @indexname)
  ) > 0,
  "SELECT 'Index idx_name_ar already exists.';",
  CONCAT("CREATE INDEX ", @indexname, " ON ", @tablename, "(name_ar);")
));
PREPARE createIndexIfNotExists FROM @preparedStatement;
EXECUTE createIndexIfNotExists;
DEALLOCATE PREPARE createIndexIfNotExists;

-- ===================================================================
-- PART 3: INSERT INITIAL DATA
-- ===================================================================

-- Insert Admin User
-- Email: admin@visaconsulting.com
-- Password: visajoadmin123
INSERT INTO users (
  email, 
  password, 
  name, 
  role, 
  permissions, 
  is_active, 
  created_at, 
  updated_at
) VALUES (
  'admin@visaconsulting.com',
  '$2b$10$W.bqL7Mj.WFGm8qEIOeLUOaeZmfKG/SpcwxFbUOZqozbPAag5fOaC',
  'Admin User',
  'admin',
  '["read", "write", "delete", "admin"]',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- ===================================================================
-- PART 4: INSERT ALL VISAS (with Arabic translations where available)
-- ===================================================================

-- Delete all existing UAE visa entries first
DELETE FROM visas WHERE country = 'uae' OR LOWER(country) = 'uae';

-- UAE Visa (with complete Arabic translations)
INSERT INTO visas (
  name, 
  name_ar,
  country, 
  category, 
  requirements, 
  requirements_ar,
  processing_time,
  processing_time_ar,
  validity,
  validity_ar,
  fees, 
  description,
  description_ar,
  notes,
  notes_ar,
  visa_types,
  visa_types_ar,
  is_active, 
  created_at, 
  updated_at
) VALUES (
  'UAE Visa',
  'تأشيرة الإمارات',
  'uae',
  'travel',
  '["A clear photo with a white background", "A 6 months validity clear passport scan or picture"]',
  '["صورة واضحة بخلفية بيضاء", "نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر"]',
  'Up to 7 working days',
  'حتى 7 أيام عمل',
  '14-90 days',
  '14-90 يوم',
  '{"consultation": 50, "government": 150, "total": 200}',
  'UAE visa with flexible duration options for tourism and business travel. Perfect for visitors looking to explore the United Arab Emirates.',
  'فيزا الإمارات مع خيارات مدة مرنة للسياحة والسفر التجاري. مثالية للزوار الذين يبحثون عن استكشاف دولة الإمارات العربية المتحدة.',
  'Processing time varies. Application must include clear documents for faster processing. Multiple entry options available for 30 and 90 day visas. All documents must be clear and valid.',
  'تختلف مدة المعالجة. يجب أن تتضمن الطلب وثائق واضحة للمعالجة السريعة. خيارات الدخول المتعدد متاحة لتأشيرات 30 و 90 يوم. يجب أن تكون جميع الوثائق واضحة وصحيحة.',
  '["14 Days Single Entry", "30 Days Multiple Entry", "90 Days Multiple Entry"]',
  '["14 يوم دخول واحد", "30 يوم دخول متعدد", "90 يوم دخول متعدد"]',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE 
  name = 'UAE Visa',
  name_ar = 'تأشيرة الإمارات',
  visa_types = '["14 Days Single Entry", "30 Days Multiple Entry", "90 Days Multiple Entry"]',
  visa_types_ar = '["14 يوم دخول واحد", "30 يوم دخول متعدد", "90 يوم دخول متعدد"]',
  validity = '14-90 days',
  validity_ar = '14-90 يوم',
  description = 'UAE visa with flexible duration options for tourism and business travel. Perfect for visitors looking to explore the United Arab Emirates.',
  description_ar = 'فيزا الإمارات مع خيارات مدة مرنة للسياحة والسفر التجاري. مثالية للزوار الذين يبحثون عن استكشاف دولة الإمارات العربية المتحدة.',
  notes = 'Processing time varies. Application must include clear documents for faster processing. Multiple entry options available for 30 and 90 day visas. All documents must be clear and valid.',
  notes_ar = 'تختلف مدة المعالجة. يجب أن تتضمن الطلب وثائق واضحة للمعالجة السريعة. خيارات الدخول المتعدد متاحة لتأشيرات 30 و 90 يوم. يجب أن تكون جميع الوثائق واضحة وصحيحة.',
  updated_at = NOW();

-- Germany Schengen Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, embassy_info, embassy_appointment, main_requirements, visa_types, is_active, created_at, updated_at) 
VALUES (
  'Germany Visa',
  'تأشيرة ألمانيا',
  'germany',
  'schengen',
  '["Valid passport with at least 6 months validity", "Completed Schengen application form", "Recent passport-sized photographs", "Proof of accommodation and travel itinerary", "Travel insurance covering EUR 30,000", "Bank statements for the last 3-6 months"]',
  '10-15 business days',
  'Up to 90 days',
  '{"consultation": 60, "government": 80, "total": 140}',
  'Short-stay Schengen visa for Germany for tourism or business.',
  'Processing times may vary during peak seasons.',
  NULL,
  NULL,
  NULL,
  NULL,
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE 
  country = VALUES(country),
  category = VALUES(category),
  requirements = VALUES(requirements),
  processing_time = VALUES(processing_time),
  validity = VALUES(validity),
  fees = VALUES(fees),
  description = VALUES(description),
  notes = VALUES(notes),
  updated_at = NOW();

-- France Schengen Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'France Visa',
  'تأشيرة فرنسا',
  'france',
  'schengen',
  '["Valid passport with at least 6 months validity", "Completed Schengen application form", "Recent passport-sized photographs", "Proof of accommodation and travel itinerary", "Travel insurance covering EUR 30,000", "Bank statements for the last 3-6 months"]',
  '10-15 business days',
  'Up to 90 days',
  '{"consultation": 60, "government": 80, "total": 140}',
  'Short-stay Schengen visa for France for tourism or business.',
  'Processing times may vary during peak seasons.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- USA Tourist Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'US Visa',
  'تأشيرة أمريكا',
  'us',
  'travel',
  '["Valid passport with at least 6 months validity", "Completed visa application form", "Proof of accommodation", "Return flight ticket", "Bank statements for the last 3 months"]',
  '5-7 business days',
  '6 months',
  '{"consultation": 50, "government": 160, "total": 210}',
  'Short-term tourist visa for leisure travel in the United States.',
  'Interview may be required depending on consulate policies.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- UK Visitor Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'UK Visa',
  'تأشيرة بريطانيا',
  'uk',
  'travel',
  '["Valid passport with at least 6 months validity", "Completed visa application form", "Proof of accommodation", "Return flight ticket", "Bank statements for the last 6 months"]',
  '10-15 business days',
  '1 year',
  '{"consultation": 75, "government": 230, "total": 305}',
  'Short-term visitor visa for the United Kingdom.',
  'Multiple entry may be available depending on consular decision.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Australia Tourist Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Australia Visa',
  'تأشيرة أستراليا',
  'australia',
  'travel',
  '["Valid passport with at least 6 months validity", "Completed visa application form", "Proof of accommodation", "Return flight ticket", "Bank statements for the last 3 months", "Health insurance"]',
  '10-15 business days',
  '12 months',
  '{"consultation": 85, "government": 145, "total": 230}',
  'Tourist visa for leisure travel to Australia.',
  'May require health check depending on country of origin.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Austria Schengen Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Austria Visa',
  'تأشيرة النمسا',
  'austria',
  'schengen',
  '["Valid passport with at least 6 months validity", "Completed Schengen application form", "Recent passport-sized photographs", "Proof of accommodation and travel itinerary", "Travel insurance covering EUR 30,000", "Bank statements for the last 3-6 months"]',
  '10-15 business days',
  'Up to 90 days',
  '{"consultation": 60, "government": 80, "total": 140}',
  'Short-stay Schengen visa for Austria.',
  'Valid for all Schengen Area countries.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Canada Visitor Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Canada Visa',
  'تأشيرة كندا',
  'canada',
  'travel',
  '["Valid passport with at least 6 months validity", "Completed visa application", "Proof of accommodation", "Return flight ticket", "Bank statements for last 6 months", "Employment letter or proof of ties to home country"]',
  '15-20 business days',
  'Up to 6 months',
  '{"consultation": 80, "government": 185, "total": 265}',
  'Visitor visa for tourism or visiting family in Canada.',
  'Strong financial proof required. Interview may be needed.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- India Tourist Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'India Visa',
  'تأشيرة الهند',
  'india',
  'travel',
  '["Valid passport with at least 6 months validity", "Completed visa application form", "Proof of accommodation", "Return flight ticket", "Bank statements for last 3 months", "Yellow fever vaccination certificate (if required)"]',
  '7-10 business days',
  '60 days',
  '{"consultation": 45, "government": 75, "total": 120}',
  'Tourist visa for leisure travel to India.',
  'Visa on Arrival also available at major airports.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Italy Schengen Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Italy Visa',
  'تأشيرة إيطاليا',
  'italy',
  'schengen',
  '["Valid passport with at least 6 months validity", "Completed Schengen application form", "Recent passport-sized photographs", "Proof of accommodation and travel itinerary", "Travel insurance covering EUR 30,000", "Bank statements for the last 3-6 months"]',
  '10-15 business days',
  'Up to 90 days',
  '{"consultation": 60, "government": 80, "total": 140}',
  'Short-stay Schengen visa for Italy.',
  'Embassy appointments must be booked in advance.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Netherlands Schengen Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Netherlands Visa',
  'تأشيرة هولندا',
  'netherlands',
  'schengen',
  '["Valid passport with at least 6 months validity", "Completed Schengen application form", "Recent passport-sized photographs", "Proof of accommodation and travel itinerary", "Travel insurance covering EUR 30,000", "Bank statements for the last 3-6 months"]',
  '10-15 business days',
  'Up to 90 days',
  '{"consultation": 60, "government": 80, "total": 140}',
  'Short-stay Schengen visa for Netherlands.',
  'Valid for entire Schengen Area.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Spain Schengen Visa
INSERT INTO visas (name, name_ar, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Spain Visa',
  'تأشيرة إسبانيا',
  'spain',
  'schengen',
  '["Valid passport with at least 6 months validity", "Completed Schengen application form", "Recent passport-sized photographs", "Proof of accommodation and travel itinerary", "Travel insurance covering EUR 30,000", "Bank statements for the last 3-6 months"]',
  '10-15 business days',
  'Up to 90 days',
  '{"consultation": 60, "government": 80, "total": 140}',
  'Short-stay Schengen visa for Spain.',
  'Processing may be faster during off-season periods.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- ===================================================================
-- PART 5: INSERT INITIAL SITE CONTENT
-- ===================================================================

INSERT INTO site_content (content_key, content_data, is_active, updated_at)
VALUES (
  'how',
  '{
    "title": "Get Your Visa",
    "steps": [
      {"title": "Schedule Your Consultation"},
      {"title": "Document Review & Preparation"},
      {"title": "Complete Application Submission"},
      {"title": "Application Review & Processing"},
      {"title": "Visa Approval & Delivery"}
    ],
    "isActive": true,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }',
  1,
  NOW()
) ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), updated_at = NOW();

-- ===================================================================
-- PART 6: DATA CLEANUP (Fix duplicate entries)
-- ===================================================================

-- Fix duplicate visa entries (if any exist) - Update to match new naming convention
UPDATE visas 
SET name = 'Germany Visa', name_ar = 'تأشيرة ألمانيا'
WHERE (name = 'Schengen Visa' OR name = 'Germany Schengen Visa') AND country = 'germany';

UPDATE visas 
SET name = 'France Visa', name_ar = 'تأشيرة فرنسا'
WHERE (name = 'Schengen Visa' OR name = 'France Schengen Visa') AND country = 'france';

UPDATE visas 
SET name = 'Austria Visa', name_ar = 'تأشيرة النمسا'
WHERE (name = 'Schengen Visa' OR name = 'Austria Schengen Visa') AND country = 'austria';

UPDATE visas 
SET name = 'Italy Visa', name_ar = 'تأشيرة إيطاليا'
WHERE (name = 'Schengen Visa' OR name = 'Italy Schengen Visa') AND country = 'italy';

UPDATE visas 
SET name = 'Netherlands Visa', name_ar = 'تأشيرة هولندا'
WHERE (name = 'Schengen Visa' OR name = 'Netherlands Schengen Visa') AND country = 'netherlands';

UPDATE visas 
SET name = 'Spain Visa', name_ar = 'تأشيرة إسبانيا'
WHERE (name = 'Schengen Visa' OR name = 'Spain Schengen Visa') AND country = 'spain';

UPDATE visas 
SET name = 'UK Visa', name_ar = 'تأشيرة بريطانيا'
WHERE (name = 'Visitor Visa' OR name = 'UK Visitor Visa') AND country = 'uk';

UPDATE visas 
SET name = 'US Visa', name_ar = 'تأشيرة أمريكا'
WHERE (name = 'Tourist Visa' OR name = 'USA Tourist Visa') AND country = 'us';

UPDATE visas 
SET name = 'Canada Visa', name_ar = 'تأشيرة كندا'
WHERE (name = 'Canada Visitor Visa') AND country = 'canada';

UPDATE visas 
SET name = 'Australia Visa', name_ar = 'تأشيرة أستراليا'
WHERE (name = 'Australia Tourist Visa') AND country = 'australia';

UPDATE visas 
SET name = 'India Visa', name_ar = 'تأشيرة الهند'
WHERE (name = 'India Tourist Visa') AND country = 'india';

-- Deactivate old UAE visa entries (if they exist)
UPDATE visas SET is_active = 0 WHERE country = 'uae' AND name IN ('UAE 14 Days Visa', 'UAE 30 Days Visa', 'UAE 90 Days Visa');

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================

-- Verify UAE visa was created correctly
SELECT 
  id, 
  name, 
  name_ar,
  country, 
  category, 
  is_active, 
  created_at 
FROM visas 
WHERE country = 'uae' 
ORDER BY created_at DESC;

-- ===================================================================
-- END OF COMPLETE SETUP
-- ===================================================================
-- This file includes:
-- ✓ All table schemas
-- ✓ Arabic fields migration
-- ✓ Contact messages table
-- ✓ All initial visa data
-- ✓ UAE visa with complete Arabic translations
-- ===================================================================

