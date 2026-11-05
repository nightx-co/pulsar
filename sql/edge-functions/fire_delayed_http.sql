DROP FUNCTION IF EXISTS pulsar.fire_delayed_http(text, timestamptz, text, text, jsonb, jsonb, int) CASCADE;

CREATE OR REPLACE FUNCTION pulsar.fire_delayed_http (
    p_job        TEXT,
    p_run_at     TIMESTAMPTZ,
    p_method     TEXT,
    p_url        TEXT,
    p_headers    JSONB,
    p_body       JSONB,
    p_timeout_ms INT
) RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER
SET search_path = '' AS $$
BEGIN
    IF clock_timestamp() < p_run_at THEN
        RETURN;
    END IF;

    BEGIN
        IF upper(p_method) = 'GET' THEN
            PERFORM net.http_get(
                url                := p_url, 
                headers            := p_headers,
                timeout_milliseconds := p_timeout_ms
            );
        ELSIF upper(p_method) = 'DELETE' THEN
            PERFORM net.http_delete(
                url                := p_url, 
                headers            := p_headers,
                timeout_milliseconds := p_timeout_ms
            );
        ELSE
            PERFORM net.http_post(
                url                := p_url, 
                body               := p_body, 
                headers            := p_headers,
                timeout_milliseconds := p_timeout_ms
            );
        END IF;
    EXCEPTION WHEN OTHERS THEN
        RAISE WARNING 'Delayed HTTP job % failed: %', p_job, SQLERRM;
    END;

    -- Unschedule after payload dispatch
    PERFORM cron.unschedule(p_job);
END;
$$;

REVOKE EXECUTE ON FUNCTION pulsar.fire_delayed_http(text, timestamptz, text, text, jsonb, jsonb, int) FROM PUBLIC, anon, authenticated;