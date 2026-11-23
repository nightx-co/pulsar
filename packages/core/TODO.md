## TODOs

### Testing & Issues
- [ ] **Test Generation** (roughly 90% remaining)
  - [ ] Storage layer tests
  - [ ] Tick module tests
  - [ ] Runtimes tests
- [ ] **GitHub**
  - [ ] Fix open GitHub issues

### Monitoring & Observability
- [ ] **Monitoring Stream Producer**
  - [ ] Stream changes and audit logs for dashboard integration

### Engine & Core Improvements
- [ ] **Nebiula**
  - [ ] Complete `Nebiula` implementation beyond its base class
  - [ ] Decide whether to keep or remove existing `Nebiula` engine config
  - [ ] Fix non-working intervention policy
- [ ] **Event-Driven Puller**
  - [ ] **Webhook Trigger Strategy** (persistent, serverless, and cross-runtime default)
    - [ ] Add queue-level storage validation and fallback/reliability strategies for `pg_net` / HTTP trigger delivery
  - [ ] **PG Notify Strategy** (persistent runtime)
    - [ ] Add reliability and recovery mechanisms so event-driven queues can restart after failures without waiting for another signal

### Queue Orchestration Capabilities
- [ ] **FIFO Ordering & Group Consumption**
  - [ ] Support FIFO group keys (`x-pgmq-group` / default group fallback) for strict ordering within groups and parallel processing across groups
  - [ ] Support group consumption strategies (round-robin fairness, batch/throughput filling, and head-per-group concurrency)
  - [ ] Support FIFO index setup where needed for query performance
- [ ] **Queue Partitioning & Scaling**
  - [ ] Support partitioned queues for scaling and data lifecycle management
- [ ] **Queue Reliability & Routing**
  - [ ] Support core orchestration queue controls (delayed delivery, visibility timeouts, batching, archiving/dead-letter handling, and topic routing where applicable)