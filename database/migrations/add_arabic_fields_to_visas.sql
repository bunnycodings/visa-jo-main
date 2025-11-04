-- ===================================================================
-- Migration: Add Arabic fields to visas table
-- Run this migration to add Arabic language support for visa details
-- This migration adds Arabic translation fields to the existing visas table
-- ===================================================================
-- IMPORTANT: This migration uses MySQL-compatible syntax
-- If using MariaDB or other MySQL variants, this should work without modification
-- ===================================================================

-- Check and add Arabic fields one by one (MySQL compatible syntax)
-- Note: MySQL doesn't support "IF NOT EXISTS" for ALTER TABLE ADD COLUMN
-- We'll use a safer approach that checks if column exists first

-- Add name_ar column
SET @dbname = DATABASE();
SET @tablename = 'visas';
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

-- Add index for better performance (if it doesn't exist)
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
-- Migration Complete
-- ===================================================================
-- All Arabic fields have been added to the visas table.
-- You can now store Arabic translations for:
-- - name_ar: Visa name in Arabic
-- - description_ar: Description in Arabic
-- - notes_ar: Notes in Arabic
-- - embassy_info_ar: Embassy information in Arabic
-- - embassy_appointment_ar: Embassy appointment details in Arabic
-- - main_requirements_ar: Main requirements in Arabic
-- - requirements_ar: Detailed requirements array in Arabic (JSON)
-- - visa_types_ar: Visa types array in Arabic (JSON)
-- - processing_time_ar: Processing time in Arabic
-- - validity_ar: Validity period in Arabic
-- ===================================================================
