## TODOs

### Unit Testing
- [ ] **Workers**
  - [ ] BaseWorker
  - [ ] DependentWorker
  - [ ] HttpWorker
  - [ ] JobMainWorker
- [ ] **Storage Drivers**
  - [ ] Postgres driver
  - [ ] Redis driver
- [ ] **Storage Repositories**
  - [ ] Postgres engine operation repository
  - [ ] Postgres queue repository
  - [ ] Queue repository
  - [ ] Redis queue repository
- [ ] **Storage Core**
  - [ ] PulsarStorage

### Core Improvements
- [ ] **`BaseWorker`**
  - [ ] Implement auto-retry mechanism
  - [ ] Improve error handling
- [ ] **Job Lifecycle & Retention**
  - [ ] Implement `removeOnComplete`
  - [ ] Implement `removeOnFail`
