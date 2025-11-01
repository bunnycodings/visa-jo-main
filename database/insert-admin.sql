-- Insert Admin User
-- Email: admin@visaconsulting.com
-- Password: visajoadmin123
--
-- IMPORTANT: Make sure you have selected your database before running this script
-- (Most hosting panels automatically select it when you run SQL)

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
);

-- If you get a duplicate entry error, the admin user already exists.
-- You can either:
-- 1. Update the existing user's password:
-- UPDATE users SET password = '$2b$10$W.bqL7Mj.WFGm8qEIOeLUOaeZmfKG/SpcwxFbUOZqozbPAag5fOaC' WHERE email = 'admin@visaconsulting.com';
--
-- 2. Or delete and re-insert:
-- DELETE FROM users WHERE email = 'admin@visaconsulting.com';
-- (Then run the INSERT statement again)

