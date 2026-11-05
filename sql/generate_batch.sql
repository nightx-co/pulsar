SELECT pgmq.send_batch(
  queue_name => 'q_1',
  msgs => ARRAY(
    SELECT jsonb_build_object(
      'type', 'report_gen',
      'job_id', gen_random_uuid(),
      'payload', jsonb_build_object('index', gs, 'data', random()),
      'created_at', to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
    )
    FROM generate_series(1, 2) AS gs
  ),
  delay => 0
);