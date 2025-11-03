-- ===================================================================
-- Visa Consulting Database - Complete Schema and Initial Data
-- MySQL/MariaDB Database Setup
-- ===================================================================
-- This is a comprehensive setup file that creates all tables and
-- populates them with initial data.
--
-- IMPORTANT: For shared hosting, you don't need CREATE DATABASE privileges.
-- Simply select your database from your hosting panel (cPanel/phpMyAdmin) 
-- and run this script. The database should already exist.
--
-- If you need to specify a database name manually, uncomment the line below
-- and replace 'your_database_name' with your actual database name:
-- USE your_database_name;
--
-- Note: Most hosting panels (like cPanel) automatically select your database
-- when you run SQL queries, so the USE statement may not be necessary.
-- ===================================================================

-- ===================================================================
-- PART 1: CREATE TABLES
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

-- ===================================================================
-- PART 2: ALTER EXISTING TABLES (for updates/migrations)
-- ===================================================================
-- These ALTER statements are safe to run even if columns already exist
-- They will update existing databases to include new fields

-- Add embassy and visa type columns to visas table (if they don't exist)
ALTER TABLE visas 
ADD COLUMN IF NOT EXISTS embassy_info TEXT NULL,
ADD COLUMN IF NOT EXISTS embassy_appointment TEXT NULL,
ADD COLUMN IF NOT EXISTS main_requirements TEXT NULL,
ADD COLUMN IF NOT EXISTS visa_types JSON NULL;

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

-- Insert All Visas
-- UAE Visas (3)
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'UAE 14 Days Visa',
  'uae',
  'travel',
  '["A clear photo with a white background", "A 6 months validity clear passport scan or picture"]',
  'Up to 7 working days',
  '14 days single entry',
  '{"consultation": 50, "government": 150, "total": 200}',
  'Short-term single entry visa for UAE valid for 14 days.',
  'Processing time varies. Application must include clear documents for faster processing.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'UAE 30 Days Visa',
  'uae',
  'travel',
  '["A clear photo with a white background", "A 6 months validity clear passport scan or picture"]',
  'Up to 7 working days',
  '30 days multiple entry',
  '{"consultation": 70, "government": 250, "total": 320}',
  '30-day multiple entry visa for UAE with flexible travel options.',
  'Allows multiple entries within the 30-day validity period.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'UAE 90 Days Visa',
  'uae',
  'travel',
  '["A clear photo with a white background", "A 6 months validity clear passport scan or picture"]',
  'Up to 7 working days',
  '90 days multiple entry',
  '{"consultation": 100, "government": 400, "total": 500}',
  'Long-term multiple entry visa for UAE valid for 90 days.',
  'Ideal for extended stays and multiple visits.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Germany Schengen Visa
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Germany Schengen Visa',
  'germany',
  'schengen',
  '["Valid passport with at least 6 months validity", "Completed Schengen application form", "Recent passport-sized photographs", "Proof of accommodation and travel itinerary", "Travel insurance covering EUR 30,000", "Bank statements for the last 3-6 months"]',
  '10-15 business days',
  'Up to 90 days',
  '{"consultation": 60, "government": 80, "total": 140}',
  'Short-stay Schengen visa for Germany for tourism or business.',
  'Processing times may vary during peak seasons.',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();

-- France Schengen Visa
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'France Schengen Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Tourist Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Visitor Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Australia Tourist Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Austria Schengen Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Canada Visitor Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'India Tourist Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Italy Schengen Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Netherlands Schengen Visa',
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
INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at) 
VALUES (
  'Spain Schengen Visa',
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
-- PART 4: INSERT INITIAL SITE CONTENT
-- ===================================================================

-- Update How It Works section
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
-- PART 5: FIXES (run only if needed)
-- ===================================================================

-- Fix duplicate "Schengen Visa" entries (if any exist)
-- This renames any generic "Schengen Visa" entries to be country-specific
UPDATE visas 
SET name = 'Germany Schengen Visa' 
WHERE name = 'Schengen Visa' AND country = 'germany';

UPDATE visas 
SET name = 'France Schengen Visa' 
WHERE name = 'Schengen Visa' AND country = 'france';

UPDATE visas 
SET name = 'Austria Schengen Visa' 
WHERE name = 'Schengen Visa' AND country = 'austria';

UPDATE visas 
SET name = 'Italy Schengen Visa' 
WHERE name = 'Schengen Visa' AND country = 'italy';

UPDATE visas 
SET name = 'Netherlands Schengen Visa' 
WHERE name = 'Schengen Visa' AND country = 'netherlands';

UPDATE visas 
SET name = 'Spain Schengen Visa' 
WHERE name = 'Schengen Visa' AND country = 'spain';

-- ===================================================================
-- END OF SCHEMA
-- ===================================================================
-- Note: The fees.consultation field remains in the JSON for backward 
-- compatibility but is no longer displayed in the UI. Only visa fees
-- (formerly government fees) are shown to users.
-- ===================================================================
