-- Grant schema access
GRANT USAGE ON SCHEMA pulsar TO postgres, service_role, authenticated, anon;

-- Grant table privileges
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA pulsar TO postgres, service_role, authenticated, anon;

-- Grant sequence privileges (for auto-incrementing IDs if any exist)
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA pulsar TO postgres, service_role, authenticated, anon;

-- Ensure future tables in pulser schema inherit these permissions automatically
ALTER DEFAULT PRIVILEGES IN SCHEMA pulsar GRANT ALL ON TABLES TO postgres, service_role, authenticated, anon;

ALTER USER postgres SET search_path TO pulsar, public;