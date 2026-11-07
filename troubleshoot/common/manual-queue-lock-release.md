# Manual Lock Reset

Pulsar locks can occasionally remain active longer than expected. If a lock does not reset automatically, it can be manually removed without waiting for the one-minute reset period.

<img width="1024" height="600" alt="Image" src="https://2eibvzhtuskxamus.public.blob.vercel-storage.com/troubleshooting/manual-lock-reset" />

For an instance running in `eu-central-1`, the lock is stored under the `locks` prefix. Event-Driven Pullers use the `EDP` prefix, while Interval-Driven Pullers use the `IDP` prefix.

To reset the lock, locate the affected queue inside the appropriate prefix and delete its lock entry.

When Pulsar is next invoked for that queue, it will execute without the previous lock and initialize a new one.