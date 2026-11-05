SELECT 
    event_object_schema AS schema_name,
    event_object_table AS table_name,
    trigger_name,
    action_timing,
    event_manipulation AS event,
    action_statement AS definition
FROM 
    information_schema.triggers
WHERE 
    event_object_schema IN ('pulsar', 'pgmq')
ORDER BY 
    event_object_schema,
    event_object_table, 
    trigger_name;