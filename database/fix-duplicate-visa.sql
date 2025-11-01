-- Fix duplicate "Schengen Visa" entries
-- Run this in phpMyAdmin to fix existing duplicates

-- Option 1: Rename existing "Schengen Visa" entries to be country-specific
-- This assumes you want to keep both but make them unique

-- Update Germany Schengen Visa (if exists)
UPDATE visas 
SET name = 'Germany Schengen Visa' 
WHERE name = 'Schengen Visa' AND country = 'germany';

-- Update France Schengen Visa (if exists)
UPDATE visas 
SET name = 'France Schengen Visa' 
WHERE name = 'Schengen Visa' AND country = 'france';

-- Option 2: If you have duplicate entries (same name, multiple rows), delete duplicates
-- Keep only one and delete the rest (uncomment if needed):

-- DELETE v1 FROM visas v1
-- INNER JOIN visas v2 
-- WHERE v1.id > v2.id 
-- AND v1.name = v2.name 
-- AND v1.name = 'Schengen Visa';

-- Option 3: If you want to remove all "Schengen Visa" entries and let auto-init recreate them:
-- DELETE FROM visas WHERE name = 'Schengen Visa';

-- After running this, the auto-initialization will create the properly named visas
-- if they don't already exist.

