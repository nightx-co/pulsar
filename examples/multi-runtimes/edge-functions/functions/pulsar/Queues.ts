import { createQueue } from "npm:@nightx.co/pulsar";

export const Queue5 = createQueue({
    queue: "q_5",
    type : "STANDER",
    concurrency: 1,
    cycleTickLimit : 10,
    maxJobsPerTick : 10_0000,
    n: 10,
    sleep: 10,
    profile: "REALTIME",
    pooler : "interval-driven-pooler",
    interventionPolicy : "inherit",
    stateTransitionPolicy : { enabled : false },
    deadLetterQueue : "dlq_q_1",
    consumer : {
        type : "http",
        url : "http://host.docker.internal:9999/client",
        headers : { "Authorization": `Bearer SUPABASE_ANON_KEY}` }
    }
});