export enum EventTriggerStrategy {
    /**
     * Uses PostgreSQL LISTEN/NOTIFY (PG Notify) for real-time event-driven queue triggering.
     * 
     * **How it works:** The engine establishes a persistent subscription to a database channel. 
     * When an event occurs, Postgres broadcasts an instant notification, triggering the queues 
     * immediately with minimal latency and zero polling overhead.
     * 
     * **Crucial Infrastructure Requirement:** This strategy **requires a direct, persistent TCP 
     * connection URL** provided to the Postgres driver. If your database infrastructure uses serverless 
     * proxies, restricted connection pools, or environments that do not support long-lived TCP socket 
     * listeners (LISTEN/NOTIFY state), this strategy will fail to receive events.
     */
    POSTGRES_NOTIFY = "POSTGRES_NOTIFY",

    /**
     * Uses an external HTTP webhook driven directly by the database (`pg_net`).
     * 
     * **How it works:** This strategy requires an accessible HTTP endpoint to be exposed on the 
     * running container or machine. When an event occurs, Postgres utilizes the built-in `pg_net` 
     * extension to fire an outbound HTTP request directly to this endpoint, which in turn invokes 
     * and executes the event-driven queues.
     */
    WEBHOOK = "WEBHOOK",

    /**
     * Uses a database-backed table polling mechanism.
     * 
     * **How it works:** Completely independent of persistent TCP notification sockets or HTTP 
     * endpoints. Instead, event producers insert new task rows directly into a designated 
     * subscription table. The engine periodically polls this table at a configured interval 
     * (e.g., every 500ms) to scan for new rows, process them, and trigger the respective queues.
     */
    POLLING = "POLLING"
}