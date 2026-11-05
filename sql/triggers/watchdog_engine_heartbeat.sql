CREATE OR REPLACE FUNCTION pulsar.watchdog_engine_heartbeat () RETURNS void AS $$
DECLARE
    v_last_ping_at timestamptz;
BEGIN
    -- Fetch the last heartbeat recorded by the engine
    SELECT last_health_checked_at INTO v_last_ping_at
    FROM pulsar.health_check
    WHERE id = 1;

    -- If no heartbeat exists or the last heartbeat is older than 1 minute,
    -- the engine is dead/unresponsive -> send a wake-up signal via HTTP.
    IF v_last_ping_at IS NULL OR v_last_ping_at < (NOW() - INTERVAL '1 minute') THEN
        
        PERFORM net.http_post(
            url := 'http://host.docker.internal:9999/process-job',
            body := '{"reason": "engine_unresponsive_wake_up"}'::jsonb,
            headers := '{"Content-Type": "application/json"}'::jsonb
        );

    END IF;
END;
$$ LANGUAGE plpgsql;