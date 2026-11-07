# Consecutive Empty Tick Executions Despite Having Jobs

This issue can happen for several reasons but the most common cause is occupied worker slots.

This usually happens when the consumer fails to acknowledge the jobs fails to receive the execution request or does not properly deregister its worker slots. It can also happen due to incorrect Pulsar configuration or a failed endpoint or socket connection.

As a result the first Tick may execute jobs successfully while subsequent Ticks continue to report empty executions despite having jobs in the queue. This happens because the worker slots remain occupied in the cache or storage layer.

## Resolution

The resolution depends on the runtime and storage backend.

**Redis**

Delete everything under the `pulsar` key. If that is not possible, delete the worker slot key associated with the affected queue.

**PostgreSQL**

Inside the Pulsar schema the `queue_cache` table in the storage can be cleared to remove the registered worker slots.

If the engine is continuously running and cannot be stopped manually identify and delete the affected worker keys from `queue_cache`.

This is currently the simplest way to resolve the issue.

## Future Improvements

Pulsar will eventually include system integrations that can detect and automatically recover from consumers failing to acknowledge jobs or deregister their worker slots.