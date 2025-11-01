-- Update How It Works section to show 5 professional steps
-- Run this in phpMyAdmin to update your existing content

UPDATE site_content 
SET content_data = '{
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
updated_at = NOW()
WHERE content_key = 'how';
