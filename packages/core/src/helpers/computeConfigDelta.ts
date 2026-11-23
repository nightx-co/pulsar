import type { IConfigurationObject } from "../types/config.types";

export function computeConfigDelta(oldCfg : IConfigurationObject, newCfg : IConfigurationObject) {
    const urlChanged = oldCfg.self_url !== newCfg.self_url;

    const oldQueueMap = new Map(oldCfg.queues.map(q => [q.queue, q.pooler]));
    const newQueueMap = new Map(newCfg.queues.map(q => [q.queue, q.pooler]));

    const addedQueues : Array<{ queue : string; pooler : string }> = [];
    const removedQueues : Array<{ queue : string; pooler : string }> = [];
    const modifiedQueues : Array<{ queue : string; oldPooler : string; newPooler : string }> = [];

    // ADDED OR MODIFIED QUEUES
    for (const [queue, newPooler] of newQueueMap.entries()) {
        if (!oldQueueMap.has(queue)) {
            addedQueues.push({ queue, pooler: newPooler });
        }
        else {
            const oldPooler = oldQueueMap.get(queue);
            if (oldPooler !== newPooler) {
                modifiedQueues.push({ queue, oldPooler: oldPooler!, newPooler });
            }
        }
    }

    // REMOVED QUEUES
    for (const [queue, oldPooler] of oldQueueMap.entries()) {
        if (!newQueueMap.has(queue)) {
            removedQueues.push({ queue, pooler: oldPooler });
        }
    }

    return {
        urlChanged,
        addedQueues,
        removedQueues,
        modifiedQueues
    }
}