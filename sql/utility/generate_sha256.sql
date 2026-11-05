CREATE OR REPLACE FUNCTION pulsar.generate_sha256(input_string TEXT)
RETURNS TEXT AS $$
BEGIN
    -- Cast text to bytea, hash it, and encode the bytea output to hex text
    RETURN encode(sha256(input_string::bytea), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;
