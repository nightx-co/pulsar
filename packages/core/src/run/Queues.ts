
import { createQueue } from "../helpers/defineQueue";

export const Queue1 = createQueue({
    queue: "q_5",
    type : "STANDER",
    concurrency: 1,
    cycleTickLimit : 10,
    maxJobsPerTick : 100_000,
    n: 10,
    sleep: 10,
    profile: "REALTIME",  // REALTIME | STANDARD | RELAXED | ULTRA_EFFICIENT | BALANCED |  CUSTOM
    pooler : "interval-driven-pooler", // interval-driven-pooler(IDP) | event-driven-pooler(EDP)
    stateTransitionPolicy : {
        enabled : false,
        idleThresholdTicks : 5,
        idleTimingProfile : { activePollMs : 100, backoffPollMs : 100, maxTimerMs : 400000, idlePollMs : 100 }
    },
    interventionPolicy : "inherit",
    consumer : {
        type : "socket",
        //url : "http://localhost:3001"
    },
});

export const Queue2 = createQueue({
    queue: "q_6",
    type : "STANDER",
    concurrency: 1,
    cycleTickLimit : 5,
    maxJobsPerTick : 1000,
    n: 10,
    sleep: 10,
    profile: "REALTIME",  // REALTIME | STANDARD | RELAXED | ULTRA_EFFICIENT | BALANCED |  CUSTOM
    pooler : "interval-driven-pooler", // interval-driven-pooler(IDP) | event-driven-pooler(EDP)
    stateTransitionPolicy : { enabled : false },
    consumer : {
        type : "socket",
        //url : "http://localhost:3009"
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
    consumer : {
        type : "socket",
        //url : "http://localhost:3000"
    }
});
