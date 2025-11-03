-- Update visas table to add embassy information and visa types
-- Remove service fees, keep only visa fees

ALTER TABLE visas 
ADD COLUMN IF NOT EXISTS embassy_info TEXT NULL,
ADD COLUMN IF NOT EXISTS embassy_appointment TEXT NULL,
ADD COLUMN IF NOT EXISTS main_requirements TEXT NULL,
ADD COLUMN IF NOT EXISTS visa_types JSON NULL;

-- Note: The fees.consultation will remain in the JSON but won't be displayed
-- The fees.government will be renamed to fees.visa in application code

