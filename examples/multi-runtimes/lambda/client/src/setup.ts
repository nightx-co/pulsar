import { PostgresDriver, RedisDriver, PulsarUnifiedStorage } from "@nightx.co/pulsar-client/storage";
import { HttpWorker } from "@nightx.co/pulsar-client/class";
import { API_KEY, POSTGRESSQL_TCP, REDIS_TCP } from "../../../environment_vars";

const cacheStorage = new RedisDriver({
    protocol : "tcp",
    connectionString : REDIS_TCP,
})

const postgresDriver = new PostgresDriver({
    connectionString: POSTGRESSQL_TCP,
    connectionProtocol : "tcp"
})

const unifiedStorage = new PulsarUnifiedStorage({
    cache : cacheStorage,
    db : postgresDriver,
    strategy : "AUTO",
})

const queue = "q_5";

export const worker = new HttpWorker(queue, {
    apiKey : API_KEY,
    storage : unifiedStorage,
    concurrency : 1,
});