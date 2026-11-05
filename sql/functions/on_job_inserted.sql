DROP FUNCTION IF EXISTS pgmq.on_job_inserted ();

CREATE OR REPLACE FUNCTION pgmq.on_job_inserted () RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  v_payload jsonb;
  v_queue_name text;
BEGIN
  -- 1. Extract queue name from table name (e.g., 'q_scrape' -> 'scrape')
  v_queue_name := REGEXP_REPLACE(TG_TABLE_NAME, '^q_', '');

  -- 2. Aggregate inserted rows into a JSON array
  SELECT jsonb_agg(
    jsonb_build_object(
      'msg_id', t.msg_id,
      'read_ct', t.read_ct,
      'enqueued_at', t.enqueued_at,
      'vt', t.vt,
      'message', t.message,
      'headers', t.headers -- Message headers column if present on your PGMQ table
    )
  )
  INTO v_payload
  FROM new_table t;

  -- 3. Invoke edge function with queue name, job records, and top-level headers
  IF v_payload IS NOT NULL THEN
    PERFORM public.invoke_edge_function(
      'process-job',
      jsonb_build_object(
        'queue', v_queue_name,
        'jobs', v_payload,
        'headers', jsonb_build_object(
          'source', 'pgmq_trigger',
          'schema', TG_TABLE_SCHEMA,
          'table', TG_TABLE_NAME,
          'count', jsonb_array_length(v_payload)
        )
      )
    );
  END IF;

  RETURN NULL;
END;
$$;