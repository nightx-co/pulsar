DROP FUNCTION IF EXISTS pulsar.schedule_http_request(text, numeric, text, jsonb, jsonb, int) CASCADE;

CREATE OR REPLACE FUNCTION pulsar.schedule_http_request (
    p_url             TEXT,
    p_delay_seconds NUMERIC DEFAULT 0,
    p_method          TEXT DEFAULT 'POST',
    p_body            JSONB DEFAULT '{}',
    p_headers         JSONB DEFAULT '{"Content-Type": "application/json"}',
    p_timeout_ms    INT DEFAULT 5000
) RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER
SET search_path = '' AS $$
DECLARE
    v_job    TEXT        := 'delayed-http-' || gen_random_uuid()::text;
    v_run_at TIMESTAMPTZ := clock_timestamp() + make_interval(secs => p_delay_seconds);
BEGIN
    PERFORM cron.schedule(
        v_job,
        '1 seconds',
        format(
            'SELECT pulsar.fire_delayed_http(%L, %L::timestamptz, %L, %L, %L::jsonb, %L::jsonb, %s)',
            v_job, v_run_at, p_method, p_url, p_headers, p_body, p_timeout_ms
        )
    );
    RETURN v_job;
END;
$$;

REVOKE EXECUTE ON FUNCTION pulsar.schedule_http_request(text, numeric, text, jsonb, jsonb, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION pulsar.schedule_http_request(text, numeric, text, jsonb, jsonb, int) TO service_role;