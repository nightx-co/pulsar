-- 1. Create the trigger function that automatically computes and sets the hash from jsonb
CREATE OR REPLACE FUNCTION pulsar.set_meta_hash_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Cast jsonb to text (Postgres automatically normalizes/sorts jsonb keys alphabetically)
    -- and pass it to your existing sha256 function.
    NEW.hash := pulsar.generate_sha256(NEW.configurations::TEXT);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;