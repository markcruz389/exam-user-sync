INSERT INTO users (name, email, synced_at)
SELECT * FROM (VALUES
  ('John Doe', 'john.doe@example.com', NOW()),
  ('Jane Smith', 'jane.smith@example.com', NULL),
  ('Bob Johnson', 'bob.johnson@example.com', NOW() - INTERVAL '1 day'),
  ('Alice Williams', 'alice.williams@example.com', NULL),
  ('Charlie Brown', 'charlie.brown@example.com', NOW() - INTERVAL '2 hours')
) AS v(name, email, synced_at)
WHERE NOT EXISTS (SELECT 1 FROM users);

