-- 1. Drop the single-queue function if it already exists
DROP FUNCTION IF EXISTS pgmq.get_single_queue_metrics(TEXT);

-- 2. Create the single-queue version
CREATE OR REPLACE FUNCTION pgmq.get_single_queue_metrics(target_queue TEXT) 
RETURNS TABLE (
  queue_name TEXT,
  ready_jobs BIGINT,
  delayed_jobs BIGINT,
  total_jobs BIGINT,
  next_visible_at TIMESTAMPTZ
) 
LANGUAGE plpgsql 
AS $$
BEGIN
  queue_name := target_queue;

  RETURN QUERY EXECUTE format(
    'SELECT 
       %L::TEXT,
       COALESCE(COUNT(*) FILTER (WHERE vt <= clock_timestamp()), 0),
       COALESCE(COUNT(*) FILTER (WHERE vt > clock_timestamp()), 0),
       COALESCE(COUNT(*), 0),
       MIN(vt) FILTER (WHERE vt > clock_timestamp())
     FROM pgmq.%I', 
    target_queue,
    'q_' || target_queue
  );
END;
$$;