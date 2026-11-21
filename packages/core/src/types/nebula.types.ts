// ============================================================================
// Nebula Integration Configuration & Engine Types
// ============================================================================

/**
 * Operating execution mode for a Pulsar engine instance inside a Nebula cluster.
 * Determines how the node handles global dynamic job spills versus dedicated queues.
 */
export type NebulaExecutionMode = 
  | 'exclusive'  // Reserved strictly for assigned queues; ignores global dynamic job spills
  | 'shared'     // Shared pool node; can accept spillover work from hot queues
  | 'hybrid';    // Primary dedicated queues + fallback spillover capacity when idle

/**
 * Connection transport strategy to communicate with the Nebula Control Plane.
 * Supports multiple backends for high-availability cluster state synchronization.
 */
export interface NebulaConnectionConfig {
    /** Target endpoint for HTTP/REST/RPC handshakes (e.g. VPS URL, Edge worker API) */
    endpoint?: string;
    /** Direct client connection for Redis-backed Nebula cluster state */
    redisUrl?: string;
    /** Direct DB client configuration for Postgres-backed cluster state */
    postgresUrl?: string;
    /** Bearer token or cluster secret key for engine-to-control-plane authentication */
    authToken?: string;
    /** Maximum timeout in milliseconds for control plane handshakes */
    timeoutMs?: number;
}

/**
 * Heartbeat, lease management, and health-reporting policy for this engine instance.
 * Ensures orphaned workers are automatically reaped and locks are safely revoked.
 */
export interface NebulaHealthConfig {
    /** Interval in milliseconds between heartbeat pings back to Nebula */
    heartbeatIntervalMs: number;
    
    /** Time-to-live for the instance lease in the central state store (seconds) */
    leaseTtlSec: number;
    
    /** Enable automatic lease revocation when the V8 isolate nears execution deadline */
    revokeOnIsolateDeath: boolean;
}


/**
 * Main Nebula configuration interface embedded directly in PulsarEngine setup.
 * Coordinates static worker code registries with Nebula's dynamic control plane routing.
 */
export interface NebulaClusterConfig {
    enabled : boolean;

    /** Cluster name or prefix namespace to isolate environments (e.g. 'prod-eu-1') */
    clusterId: string;

    /**
     * Defines whether this engine instance operates as an exclusive, shared, or hybrid process
     * within the Nebula cluster, controlling how queues are assigned during handshakes:
     * - **'exclusive'**: Locks the instance strictly to its pre-configured static queues (e.g., `q1`, `q2`). 
     *   Even during high traffic or load spikes, Nebula will never route any other queues to this instance.
     * - **'shared'**: Allows Nebula to dynamically allocate any queues supported by this instance's 
     *   partition based on current cluster load, backlogs, and scheduling algorithms.
     * - **'hybrid'**: Maintains primary dedicated queue assignments while permitting the node to absorb 
     *   fallback spillover capacity and overflow traffic whenever resources are idle.
     */
    assignmentScope: NebulaExecutionMode;

    /** Transport configuration for communicating with Nebula */
    connection: NebulaConnectionConfig;

    /** Health check, lease TTL, and heartbeat options */
    health: NebulaHealthConfig;

    /** 
     * Strict queue allocation safety guard.
     * If true, throws an error if local static queue configuration collides 
     * with assigned Nebula remote queues on startup.
     */
    strictIsolation?: boolean;

    supportedPartitions? : string[];
}