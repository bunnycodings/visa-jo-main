-- Migration: Add Arabic fields to visas table
-- Run this migration to add Arabic language support for visa details

ALTER TABLE visas
ADD COLUMN IF NOT EXISTS name_ar VARCHAR(255) NULL AFTER name,
ADD COLUMN IF NOT EXISTS description_ar TEXT NULL AFTER description,
ADD COLUMN IF NOT EXISTS notes_ar TEXT NULL AFTER notes,
ADD COLUMN IF NOT EXISTS embassy_info_ar TEXT NULL AFTER embassy_info,
ADD COLUMN IF NOT EXISTS embassy_appointment_ar TEXT NULL AFTER embassy_appointment,
ADD COLUMN IF NOT EXISTS main_requirements_ar TEXT NULL AFTER main_requirements,
ADD COLUMN IF NOT EXISTS requirements_ar JSON NULL AFTER requirements,
ADD COLUMN IF NOT EXISTS visa_types_ar JSON NULL AFTER visa_types,
ADD COLUMN IF NOT EXISTS processing_time_ar VARCHAR(255) NULL AFTER processing_time,
ADD COLUMN IF NOT EXISTS validity_ar VARCHAR(255) NULL AFTER validity;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_name_ar ON visas(name_ar);

