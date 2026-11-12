# Manual Worker Slot Release

Worker slots are registered during Tick dispatch and stored inside the worker registry. If the registered slots are not released properly they can prevent subsequent executions from acquiring available slots.

For the `eu-central-1` instance the worker registry is located under `locks` followed by `queues` and the targeted queue. In this example the queue is `q5`. The `worker registry` hash contains the registered worker entries.

The hash itself does not have a TTL. However, individual entries have a TTL of one minute and are automatically removed after expiration. The hash is eventually removed if no further entries are registered.

To manually reset the worker slots, it is recommended to delete the `worker registry` key for the affected queue rather than removing individual entries. The `global worker registry` key should also be deleted to reset the global worker slot registrations.

For PostgreSQL using the `unlogged` table the same approach applies. Locate the relevant entries inside `queue_cache` with the `worker registry` and `global worker registry` prefixes and delete them.

Once the stale registrations are removed, worker slot acquisition can start again.


<img width="1024" height="600" alt="Image" src="https://2eibvzhtuskxamus.public.blob.vercel-storage.com/troubleshooting/manual-worker-slot-free" />