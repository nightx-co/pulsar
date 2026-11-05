DROP FUNCTION IF EXISTS pulsar.handle_edp_queue_dispatch();

CREATE OR REPLACE FUNCTION pulsar.handle_edp_queue_dispatch() RETURNS trigger AS $$
DECLARE
    v_queue_name text := COALESCE(TG_ARGV[0], 'q_1');
    v_instance_id text := COALESCE(TG_ARGV[1], 'unknown');
    v_target_url text;
    v_trigger_strategy text;
    v_lock_key bigint := hashtext(v_queue_name);
    v_acquired boolean;
    v_fencing_token integer;
    v_headers jsonb;
    v_payload jsonb;
    v_channel_name text := 'channel_pulsar_event_driven_queue';
BEGIN
    v_acquired := pg_try_advisory_xact_lock(v_lock_key);

    IF NOT v_acquired THEN
        RETURN NULL;
    END IF;

    SELECT url, configurations->>'event_trigger_strategy' 
    INTO v_target_url, v_trigger_strategy
    FROM pulsar.meta
    WHERE is_active = true
        AND instance_id = v_instance_id
        AND EXISTS (
          SELECT 1 
          FROM jsonb_array_elements(configurations->'queues') AS q
          WHERE q->>'queue' = v_queue_name 
            AND q->>'pooler' = 'event-driven-pooler'
      )
    LIMIT 1;

    IF v_trigger_strategy IS NULL THEN
        RETURN NULL;
    END IF;

    INSERT INTO pulsar.queue_locks (queue_name, locked_until)
    VALUES (v_queue_name, clock_timestamp() + INTERVAL '30 seconds')
    ON CONFLICT (queue_name) DO UPDATE 
        SET locked_until = clock_timestamp() + INTERVAL '30 seconds',
            fencing_token = nextval('pulsar.unlogged_queue_locks_fencing_token_seq')
        WHERE pulsar.queue_locks.locked_until <= clock_timestamp()
    RETURNING fencing_token INTO v_fencing_token;

    IF v_fencing_token IS NULL THEN
        RETURN NULL;
    END IF;

    v_payload := jsonb_build_object(
        'queue_name', v_queue_name,
        'fencing_token', v_fencing_token,
        'execution_at', to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
    );

    CASE UPPER(v_trigger_strategy)
        WHEN 'WEBHOOK' THEN
            IF v_target_url IS NULL OR v_target_url = 'NOT_REQUIRED' THEN
                RETURN NULL;
            END IF;

            v_headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'x-fencing-token', v_fencing_token,
                'x-last-execution-id', NULL,
                'x-last-execution-at', to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
                'x-execution-owner', 'trigger',
                'x-restart', 'false',
                'x-pooler', 'event-driven-pooler',
                'x-target-queue', v_queue_name
            );

            PERFORM net.http_post(
                url := v_target_url,
                body := jsonb_build_object('queue_name', v_queue_name),
                headers := v_headers
            );

        WHEN 'POSTGRES_NOTIFY' THEN
            PERFORM pg_notify(v_channel_name, v_payload::text);

        WHEN 'POLLING' THEN
            INSERT INTO pulsar.pool_queue_entries (queue, payload, created_at)
            VALUES (v_queue_name, v_payload, clock_timestamp());

        ELSE
            NULL;
    END CASE;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;