import { createQueue } from "@nightx.co/pulsar";

export const Queue5 = createQueue({
    queue: "q_5",
    type : "STANDER",
    concurrency: 1,
    cycleTickLimit : 10,
    maxJobsPerTick : 1000,
    n: 10,
    sleep: 10,
    profile: "REALTIME",
    pooler : "interval-driven-pooler",
    stateTransitionPolicy : { enabled : false },
    interventionPolicy : "inherit",
    consumer : {
        type : "http",
        url : "http://localhost:3000/dev",
        headers : { "Authorization": `Bearer SUPABASE_ANON_KEY}` },
        optimizePayload : false
    }
});