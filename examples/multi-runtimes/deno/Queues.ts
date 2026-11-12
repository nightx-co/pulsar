import { createQueue } from "pulsar";

export const Queue1 = createQueue({
    queue: "q_1",
    type : "STANDER",
    concurrency: 10,
    cycleTickLimit : 10,
    maxJobsPerTick : 1000,
    n: 10,
    sleep: 10,
    profile: { activePollMs : 1000, backoffPollMs : 1000, maxTimerMs : 500, idlePollMs : 100 },  // REALTIME | STANDARD | RELAXED | ULTRA_EFFICIENT | BALANCED |  CUSTOM
    pooler : "interval-driven-pooler", // interval-driven-pooler(IDP) | event-driven-pooler(EDP)
    consumer : {
        type : "http",
        url : "http://localhost:9999/test-f",
        headers : { "Authorization": `Bearer SUPABASE_ANON_KEY}` }
    }
});

export const Queue2 = createQueue({
    queue: "q_2",
    type : "STANDER",
    concurrency: 10,
    cycleTickLimit : 10,
    maxJobsPerTick : 1000,
    n: 10,
    sleep: 10,
    profile: "REALTIME",  // REALTIME | STANDARD | RELAXED | ULTRA_EFFICIENT | BALANCED |  CUSTOM
    pooler : "event-driven-pooler", // interval-driven-pooler(IDP) | event-driven-pooler(EDP)
    consumer : {
        type : "http",
        url : "http://localhost:9999/test-f",
        headers : { "Authorization": `Bearer SUPABASE_ANON_KEY}` }
    }
});

export const Queue3 = createQueue({
    queue: "q_3",
    type : "STANDER",
    concurrency: 1,
    cycleTickLimit : 10,
    maxJobsPerTick : 1000,
    n: 10,
    sleep: 10,
    profile: "REALTIME",  // REALTIME | STANDARD | RELAXED | ULTRA_EFFICIENT | BALANCED |  CUSTOM
    pooler : "event-driven-pooler", // interval-driven-pooler(IDP) | event-driven-pooler(EDP)
    stateTransitionPolicy : {
        enabled : false,
    },
    // consumer : {
    //     type : "http",
    //     url : "http://localhost:9999/test-f",
    //     headers : { "Authorization": `Bearer SUPABASE_ANON_KEY}` }
    // }

    consumer : {
        type : "http",
        url : "http://localhost:3000"
    }
});