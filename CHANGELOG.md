# [1.0.0] - Initial Release

## Added

- **Core Architecture**: Initialized the Pulsar project architecture, including core modules, shared runtime components, and global type declarations.

- **Cluster Management**: Added the `Nebula` cluster management module.

- **Helper Utilities**: Added configuration delta computation, queue definition utilities, and SHA hash generation helpers.
  - `computeConfigDelta.ts`
  - `defineQueue.ts`
  - `generateShaHash.ts`

- **Integrations**: Added Pulsar event and logger integrations.
  - `PulsarEventsIntegrations.ts`
  - `PulsarLoggerIntegrations.ts`

- **Modules**: Added queue, scheduler, tick, and tick controller modules.
  - `Queue.module.ts`
  - `Scheduler.module.ts`
  - `Tick.module.ts`
  - `TickController.module.ts`

- **Monitoring**: Added monitoring stream infrastructure, including the monitoring stream producer and server-side monitoring stream.

- **Networking Infrastructure**: Added a unified networking architecture with support for HTTP and WebSocket transports.
  - Base network driver abstraction.
  - HTTP network driver.
  - WebSocket network driver.
  - Authentication infrastructure.
  - Network interface definitions.
  - Unified transport manager.
  - HTTP queue operation helpers.

- **Runtime Environments**: Added support for multiple execution environments.
  - `IsolateRuntime.ts`
  - `PersistentRuntime.ts`
  - `ServerlessRuntime.ts`
  - Runtime type definitions.

- **Queue Execution and Management**: Added queue execution entry points and queue management infrastructure.
  - `run/index.ts`
  - `run/index2.ts`
  - `run/Queues.ts`

- **Distributed Coordination Scripts**: Added Lua scripts and SQL operations for worker registration, queue locking, job budget management, worker counting, dead run evaluation, lock release, and execution stopping.
  - Redis queue lock acquisition and release.
  - Global job budget claiming and refunding.
  - Active worker counting.
  - Dead run evaluation.
  - Worker registration.
  - Execution stopping.

- **Server Infrastructure**: Added server-side request handling and execution infrastructure.
  - Pulsar request handler.
  - Request parsing utilities.
  - Redis lock acquisition helpers.
  - Fencing validity checks.
  - Isolate restart management.
  - Persistent and serverless server infrastructure.
  - HTTP header extraction utilities.

- **Services**: Added the core service layer.
  - `ConfigurationStore.ts`
  - `Isolate.service.ts`
  - `Pulsar.service.ts`
  - `PulsarBaseService.ts`
  - `PulsarEventBus.ts`
  - `SwarmBudgetTracker.ts`
  - `PulsarWorker.ts`

- **Shared Runtime Infrastructure**: Added `PulsarRuntimeCore.ts` for shared runtime functionality.

- **Static Configuration and Timing**: Added static configuration utilities and timing profile definitions.

- **Storage Infrastructure**: Added PostgreSQL and Redis storage drivers, storage abstractions, and repository implementations.
  - PostgreSQL driver.
  - Redis driver.
  - Pulsar storage abstraction.
  - PostgreSQL engine operation repository.
  - PostgreSQL queue repository.
  - Redis queue repository.
  - Unified queue repository abstraction.
  - Storage driver type definitions.

- **Subsystems**: Added foundational runtime and execution subsystems.
  - Deferred tick evaluation.
  - Event bus infrastructure.
  - Execution profile switching.
  - Logger service.
  - Pulsar clock.
  - Runtime cache storage.
  - Runtime event bridge.

- **Type Definitions**: Added comprehensive TypeScript type definitions for base structures, configuration, consumers, engine, event trigger strategies, integrations, Nebula, queues, and runtimes.

- **Project Entry Points**: Added root and subsystem entry points for exposing project functionality.

- **Policy Configuration**: Added `policy.yaml` for project policy configuration.

## Added

- **Worker Architecture**: Added the foundational worker classes and execution infrastructure.
  - `base-worker.ts`: Base worker abstraction.
  - `dependent-worker.ts`: Dependent worker implementation.
  - `http-worker.ts`: HTTP worker implementation.
  - `main-worker.ts`: Main worker implementation.
  - `Job.ts`: Job class implementation.
  - `class/index.ts`: Worker class exports.

- **Payload Parsing Utilities**: Added `parseAnyPayload.ts` for handling and parsing generic payload structures.

- **Run Execution Infrastructure**: Added the `runs/index.ts` entry point for run-related execution functionality.

- **Storage Infrastructure**: Added PostgreSQL and Redis storage drivers, storage abstractions, and repository implementations.
  - `PostgresDriver.ts`: PostgreSQL storage driver.
  - `RedisDriver.ts`: Redis storage driver.
  - `types.ts`: Storage driver type definitions.
  - `PulsarStorage.ts`: Centralized storage abstraction.
  - `PostgresEngineOperationRepository.ts`: PostgreSQL engine operation repository.
  - `PostgresQueueRepository.ts`: PostgreSQL queue repository.
  - `RedisQueueRepository.ts`: Redis queue repository.
  - `QueueRepository.ts`: Queue repository abstraction.
  - `storage/index.ts`: Storage module exports.

- **Worker Type Definitions**: Added `worker.types.ts` for worker-related TypeScript interfaces and type definitions.

- **Logging Utilities**: Added `LoggerService.ts` under `utils/` for logging functionality.

- **Project Entry Points**: Added and updated entry points for exposing worker, run, and project-level functionality.
