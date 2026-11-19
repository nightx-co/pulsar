import { PulsarUnifiedStorage } from "../storage/PulsarStorage";
import { PostgresDriver } from "../storage/drivers/PostgresDriver";
import { RedisDriver } from "../storage/drivers/RedisDriver";

import { DependentWorker } from "../class/dependent-worker";
import { HttpWorker } from "../class/http-worker";
import { Worker } from "../class/main-worker";

const cacheStorage = new RedisDriver({
    protocol : "tcp",
    connectionString : "127.0.0.1:6379",
})

const postgresDriver = new PostgresDriver({
    connectionString: "postgresql://postgres:password@localhost:5432/postgres",
    connectionProtocol : 'tcp',
})

const unifiedStorage = new PulsarUnifiedStorage ({
    cache : cacheStorage,
    db : postgresDriver,
    strategy : "AUTO",
})

const apiKey = 'MMvGnFbCs7gpFaO31SOmvz4b82jEp1SVfoKLUAIIivqGXPoVDDeycjDfdwAOIkwx';
//const apiKey = '7PN8SKr2gH7zcZXN4D7SxaVkZJrRomsB4Nm9kwdu0ICKQ3euiWv96w0t2JfzhqZUTiZzUKVxdHpGUnUyhlPGBM1oe1CGfQgfrGfVYfrMeT7Aj8SV5GylMBma5jeEap24';

// new Worker('order_processing_queue',
//     async (job) => {
//         await job.ack(false);
//     },
//     {
//         removeOnFail : false,
//         removeOnComplete : true,
//         storage : unifiedStorage,
//         concurrency : 1,
//         wsConnectionString : PULSAR_SOCKET_URL,
//         apiKey,
//         reconnectionDelay : 2000
//     }
// )

new Worker('q_5',
    async (job) => {
        await job.ack(false);
    },
    { removeOnFail : false, removeOnComplete : true, storage : unifiedStorage, concurrency : 1, wsConnectionString : "http://localhost:9500", apiKey, reconnectionDelay : 2000 }
)

//const dependentWorker = new DependentWorker<{ batman : string }>('q_2', { apiKey, concurrency : 1, connection : { url : 'http://localhost:9500', headers : {} } });

/*
Bun.serve({
    port: 3001,
    fetch: handler,
});

console.log(`Consumer Sever Listening On Port : 3001`);

const httpWorker = new HttpWorker('q_5', { storage : unifiedStorage, concurrency : 1, apiKey });

async function handler(request : Request) : Promise<Response> {
    const userAgent = request.headers.get("user-agent") || "";

    if (userAgent.includes("Cursor") || userAgent.includes("Electron")) {
        return new Response('success', { status : 200 });
    }

    await httpWorker.handle(request,
        async (job) => {
            await job.ack(true);
        }
    )

    // await dependentWorker.handle(request,
    //     async (job) => {

    //         console.log(`acknowledge job ${job.id}`);

    //         await job.ack();
    //     }
    // )

    return Response.json(
        { error: "Not found" },
        { status: 200 },
    )
}
*/