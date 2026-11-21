import { IBatchCandidate } from "../../../../../src/modules/Tick.module";
import { QueueMessage } from "../../../../../src/types/queue.types";

export function generateRandomCandidateBatches(count : number) : IBatchCandidate[] {
    const candidates : IBatchCandidate[] = [];
    
    for (let i = 1; i <= count; i++) {
        const batchSize = Math.floor(Math.random() * 3) + 1;
        const messages : QueueMessage[] = [];

        for (let j = 1; j <= batchSize; j++) {
            messages.push({
                msg_id: Math.floor(Math.random() * 10000),
                read_ct: 0,
                enqueued_at: new Date(),
                vt: new Date(Date.now() + 30000),
                message: { taskType: `task-${i}-${j}`, payload: Math.random() }
            });
        }

        candidates.push({
            workerId: `worker-${i}`,
            batch: messages
        });
    }

    return candidates;
}