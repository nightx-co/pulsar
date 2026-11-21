import type { IQueueRepository } from "../../storage/repositories/QueueRepository";

interface IAquireInstanceLock {
    repository : IQueueRepository;
    isEventDriven : boolean;
    targetQueue : string;
    lastExecutionId : string;
    instanceId : string;
    requestStorageDisconnect: () => Promise<void>;
}

export async function aquireInstanceLock({ repository, isEventDriven, lastExecutionId, targetQueue, instanceId, requestStorageDisconnect } : IAquireInstanceLock) {
    const lockKey = isEventDriven ? `lock:edp:${targetQueue}` : `lock:idp`;
    const lockTTL = 120_000;

    const lockAcquired = await repository.acquireQueueLock(
        lockKey,
        lastExecutionId,
        lockTTL
    )

    if (lockAcquired) {
        await repository.clearDispatchPending(lockKey);
    }
    else {
        console.log(`[LOCK REJECTED] : Active execution lock already held for key: ${lockKey}`);
        await requestStorageDisconnect();
        return {
            message: "Isolate active, skipping redundant run.",
            status: 200
        }
    }

    return lockKey;
}