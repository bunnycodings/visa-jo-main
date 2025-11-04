-- Migration: Add Arabic fields to visas table
-- Run this migration to add Arabic language support for visa details
-- This version uses ALTER TABLE syntax compatible with MySQL

-- Add Arabic fields one by one
ALTER TABLE visas
ADD COLUMN name_ar VARCHAR(255) NULL AFTER name;

ALTER TABLE visas
ADD COLUMN description_ar TEXT NULL AFTER description;

ALTER TABLE visas
ADD COLUMN notes_ar TEXT NULL AFTER notes;

ALTER TABLE visas
ADD COLUMN embassy_info_ar TEXT NULL AFTER embassy_info;

ALTER TABLE visas
ADD COLUMN embassy_appointment_ar TEXT NULL AFTER embassy_appointment;

ALTER TABLE visas
ADD COLUMN main_requirements_ar TEXT NULL AFTER main_requirements;

ALTER TABLE visas
ADD COLUMN requirements_ar JSON NULL AFTER requirements;

ALTER TABLE visas
ADD COLUMN visa_types_ar JSON NULL AFTER visa_types;

ALTER TABLE visas
ADD COLUMN processing_time_ar VARCHAR(255) NULL AFTER processing_time;

ALTER TABLE visas
ADD COLUMN validity_ar VARCHAR(255) NULL AFTER validity;

-- Add index for better performance
CREATE INDEX idx_name_ar ON visas(name_ar);

