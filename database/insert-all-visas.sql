-- Insert All Visas for Visa Consulting System
-- This script adds all 12 visa types to the database
-- Run this in phpMyAdmin for immediate availability in admin panel

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
