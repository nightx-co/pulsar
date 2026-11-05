-- Old signature took p_now from the app; drop it so nobody can call it by accident.
DROP FUNCTION IF EXISTS register_workers(VARCHAR, VARCHAR, INT, INT, BIGINT, BIGINT, VARCHAR[]);
DROP FUNCTION IF EXISTS register_workers(VARCHAR, VARCHAR, INT, INT, BIGINT, VARCHAR[]);

CREATE OR REPLACE FUNCTION register_workers (
    p_queue_key VARCHAR,
    p_global_key VARCHAR,
    p_local_concurrency INT,
    p_global_concurrency INT,
    p_ttl_ms BIGINT,
    p_candidate_ids VARCHAR[]
) RETURNS TABLE (granted_worker_id VARCHAR) AS $$
DECLARE
    v_now BIGINT;
    v_expire_at BIGINT;
    v_local_active INT;
    v_global_active INT;
    v_available_slots INT;
    v_candidate_count INT;
    v_to_grant INT;
BEGIN
    -- Serialize calls touching this queue and the global pool (consistent order => no deadlocks)
    IF hashtext(p_queue_key) < hashtext(p_global_key) THEN
        PERFORM pg_advisory_xact_lock(hashtext(p_queue_key));
        PERFORM pg_advisory_xact_lock(hashtext(p_global_key));
    ELSE
        PERFORM pg_advisory_xact_lock(hashtext(p_global_key));
        PERFORM pg_advisory_xact_lock(hashtext(p_queue_key));
    END IF;

    -- Read the clock AFTER taking the locks so waiting on them can't make "now" stale.
    v_now := pulsar.now_ms();
    v_expire_at := v_now + p_ttl_ms;

    -- 1. Purge expired workers (queue + global)
    DELETE FROM pulsar.queue_cache
    WHERE (key = p_queue_key OR key = p_global_key)
      AND expires_at <= v_now;

    -- 2. Active counts
    SELECT COUNT(*) INTO v_local_active
    FROM pulsar.queue_cache
    WHERE key = p_queue_key AND expires_at > v_now;

    SELECT COUNT(*) INTO v_global_active
    FROM pulsar.queue_cache
    WHERE key = p_global_key AND expires_at > v_now;

    -- 3. Global check, then local check (same order as the Lua script)
    IF p_global_concurrency - v_global_active <= 0 THEN
        RETURN;
    END IF;

    IF p_local_concurrency - v_local_active <= 0 THEN
        RETURN;
    END IF;

    -- 4. Atomic capacity = MIN(local, global)
    v_available_slots := LEAST(
        p_global_concurrency - v_global_active,
        p_local_concurrency - v_local_active
    );

    v_candidate_count := COALESCE(cardinality(p_candidate_ids), 0);
    v_to_grant := LEAST(v_available_slots, v_candidate_count);

    IF v_to_grant <= 0 THEN
        RETURN;
    END IF;

    -- 5. Grant first N candidates (input order preserved, duplicates collapsed)
    RETURN QUERY
    WITH candidate_slice AS (
        SELECT t.worker_id, MIN(t.ord) AS ord
        FROM unnest(p_candidate_ids[1:v_to_grant]) WITH ORDINALITY AS t(worker_id, ord)
        GROUP BY t.worker_id
    ),
    inserted_local AS (
        INSERT INTO pulsar.queue_cache (key, field, value, expires_at)
        SELECT p_queue_key, cs.worker_id, 'active', v_expire_at
        FROM candidate_slice cs
        ON CONFLICT (key, field)
        DO UPDATE SET expires_at = EXCLUDED.expires_at
        RETURNING field
    ),
    inserted_global AS (
        INSERT INTO pulsar.queue_cache (key, field, value, expires_at)
        SELECT p_global_key, p_queue_key || ':' || cs.worker_id, 'active', v_expire_at
        FROM candidate_slice cs
        ON CONFLICT (key, field)
        DO UPDATE SET expires_at = EXCLUDED.expires_at
        RETURNING field
    )
    SELECT cs.worker_id
    FROM candidate_slice cs
    ORDER BY cs.ord;
END;
$$ LANGUAGE plpgsql;