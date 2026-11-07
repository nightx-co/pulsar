import { PostgresDriver, RedisDriver, PulsarUnifiedStorage } from "npm:@nightx.co/pulsar-client/storage";
import { HttpWorker } from "npm:@nightx.co/pulsar-client/class";

const cacheStorage = new RedisDriver({
    protocol : "tcp",
    connectionString : "host.docker.internal:6379",
})

const postgresDriver = new PostgresDriver({
    connectionString: "postgresql://postgres:password@host.docker.internal:5432/postgres",
    connectionProtocol : "tcp"
})

const unifiedStorage = new PulsarUnifiedStorage({
    cache : cacheStorage,
    db : postgresDriver,
    strategy : "REDIS_CACHE",
})

const queue = "q_5";
const API_KEY = "MMvGnFbCs7gpFaO31SOmvz4b82jEp1SVfoKLUAIIivqGXPoVDDeycjDfdwAOIkwx";

const httpWorker = new HttpWorker(queue, {
    apiKey : API_KEY,
    storage : unifiedStorage,
    concurrency : 1,
});

Deno.serve(async (req : Request) => {
    const selfUrl = req.headers.get('x-pulsar-callback-url');
    console.log(`x-pulsar-callback-url : ${selfUrl}`);

    const response = await httpWorker.handle(req,
        async (job) => {
            await job.ack(true);
        }
    )

    if(response) {
        return new Response(JSON.stringify({ message : response.message }), { headers : { 'Content-Type' : "application/json" }, status : response.status });
    }

    return new Response(JSON.stringify({ status : 'success' }), { headers : { 'Content-Type' : "application/json" } })
})