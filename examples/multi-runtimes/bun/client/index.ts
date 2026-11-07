import { PostgresDriver, RedisDriver, PulsarUnifiedStorage } from "@nightx.co/pulsar-client/storage";
import { HttpWorker } from "@nightx.co/pulsar-client/class";
import { POSTGRESSQL_TCP, REDIS_TCP, API_KEY } from "../../environment_vars";

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

const httpWorker = new HttpWorker(queue, {
    apiKey : API_KEY,
    storage : unifiedStorage,
    concurrency : 1,
});

Bun.serve({
    port: 3000,
    fetch: handler,
});

console.log(`Consumer Sever Listening On Port : 3000`);

async function handler(request : Request) : Promise<Response> {
    const selfUrl = request.headers.get('x-pulsar-callback-url');
    console.log(`x-pulsar-callback-url : ${selfUrl}`);

    await httpWorker.handle(request,
        async (job) => {
            await job.ack(true);
        }
    )

    return Response.json(
        { error: "Not found" },
        { status: 200 },
    )
}
