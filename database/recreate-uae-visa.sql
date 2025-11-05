-- Drop and Recreate UAE Visa Entry
-- This script deletes all existing UAE visas and creates a fresh entry

-- Delete all existing UAE visa entries
DELETE FROM visas WHERE country = 'uae' OR LOWER(country) = 'uae';

-- Insert new UAE Visa entry with complete information
INSERT INTO visas (
  name, 
  country, 
  category, 
  requirements, 
  processing_time, 
  validity, 
  fees, 
  description, 
  notes, 
  visa_types,
  is_active, 
  created_at, 
  updated_at
) VALUES (
  'UAE Visa',
  'uae',
  'travel',
  '["A clear photo with a white background", "A 6 months validity clear passport scan or picture"]',
  'Up to 7 working days',
  '14-90 days',
  '{"consultation": 50, "government": 150, "total": 200}',
  'UAE visa with flexible duration options for tourism and business travel. Perfect for visitors looking to explore the United Arab Emirates.',
  'Processing time varies. Application must include clear documents for faster processing. Multiple entry options available for 30 and 90 day visas. All documents must be clear and valid.',
  '["14 Days Single Entry", "30 Days Multiple Entry", "90 Days Multiple Entry"]',
  1,
  NOW(),
  NOW()
);

-- Verify the insertion
SELECT 
  id, 
  name, 
  country, 
  category, 
  is_active, 
  created_at 
FROM visas 
WHERE country = 'uae' 
ORDER BY created_at DESC;

