CREATE SCHEMA pgmq;

CREATE OR REPLACE FUNCTION pgmq.archive(q_name text, target_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    is_archived BOOLEAN;
BEGIN
    EXECUTE format('
        WITH moved AS (
            DELETE FROM pgmq.q_%I WHERE msg_id = $1 RETURNING *
        ), archived AS (
            INSERT INTO pgmq.a_%I (msg_id, read_ct, enqueued_at, vt, message)
            SELECT msg_id, read_ct, enqueued_at, vt, message FROM moved
            RETURNING msg_id
        )
        SELECT EXISTS(SELECT 1 FROM archived);
    ', q_name, q_name)
    USING target_id
    INTO is_archived;
    
    RETURN is_archived;
END;

CREATE OR REPLACE FUNCTION pgmq."create"(q_name text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Track queue in metadata registry
    INSERT INTO pgmq.meta (queue_name) VALUES (q_name)
    ON CONFLICT (queue_name) DO NOTHING;

    -- Generate a clean queue table (Index updated to be compliant)
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS pgmq.q_%I (
            msg_id BIGSERIAL PRIMARY KEY,
            read_ct INT DEFAULT 0 NOT NULL,
            enqueued_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
            vt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
            message JSONB NOT NULL
        );
        -- FIX: Removed the mutable "WHERE vt <= now()" clause
        CREATE INDEX IF NOT EXISTS q_%I_vt_idx ON pgmq.q_%I (vt ASC);
    ', q_name, q_name, q_name);

    -- Generate a corresponding clean archive table
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS pgmq.a_%I (
            msg_id BIGINT PRIMARY KEY,
            read_ct INT NOT NULL,
            enqueued_at TIMESTAMPTZ NOT NULL,
            archived_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
            vt TIMESTAMPTZ NOT NULL,
            message JSONB NOT NULL
        );
    ', q_name);
END;

CREATE OR REPLACE FUNCTION pgmq.delete(q_name text, target_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    is_deleted BOOLEAN;
BEGIN
    EXECUTE format('
        WITH deleted AS (
            DELETE FROM pgmq.q_%I WHERE msg_id = $1 RETURNING msg_id
        )
        SELECT EXISTS(SELECT 1 FROM deleted);
    ', q_name) 
    USING target_id 
    INTO is_deleted;
    
    RETURN is_deleted;
END;

CREATE OR REPLACE FUNCTION pgmq.read(q_name text, vt_sec integer, qty integer)
 RETURNS TABLE(msg_id bigint, read_ct integer, enqueued_at timestamp with time zone, vt timestamp with time zone, message jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY EXECUTE format('
        WITH target_msgs AS (
            SELECT t.msg_id 
            FROM pgmq.q_%I t
            WHERE t.vt <= NOW()
            ORDER BY t.msg_id ASC
            LIMIT $1
            FOR UPDATE SKIP LOCKED
        )
        UPDATE pgmq.q_%I q
        SET vt = NOW() + INTERVAL %L,
            read_ct = q.read_ct + 1
        FROM target_msgs tm
        WHERE q.msg_id = tm.msg_id
        RETURNING q.msg_id, q.read_ct, q.enqueued_at, q.vt, q.message;
    ', q_name, q_name, vt_sec || ' seconds')
    USING qty;
END;

CREATE OR REPLACE FUNCTION pgmq.send(q_name text, msg jsonb, delay_sec integer DEFAULT 0)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
DECLARE
    assigned_id BIGINT;
BEGIN
    EXECUTE format('
        INSERT INTO pgmq.q_%I (message, vt) 
        VALUES ($1, NOW() + INTERVAL %L) 
        RETURNING msg_id;
    ', q_name, delay_sec || ' seconds') 
    USING msg 
    INTO assigned_id;
    
    RETURN assigned_id;
END;