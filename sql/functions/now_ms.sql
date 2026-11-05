-- Single time source for every expiry decision: the database clock.
-- clock_timestamp() (not now()) so it advances inside long transactions.
CREATE OR REPLACE FUNCTION pulsar.now_ms() RETURNS bigint AS $$
    SELECT (extract(epoch FROM clock_timestamp()) * 1000)::bigint
$$ LANGUAGE sql VOLATILE;