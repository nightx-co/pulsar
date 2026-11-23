import type { IPulsarPostgresEngineOperationRepository } from "../../storage/repositories/PostgresEngineOperationRepository";

interface ICheckFencingTokenValidity {
    isEventDriven : boolean;
    executionOwner : string;
    fencingToken? : string;
    targetQueue : string;
    ops : IPulsarPostgresEngineOperationRepository;
    requestStorageDisconnect: () => Promise<void>;
}

export async function checkFencingTokenValidity({ executionOwner, fencingToken, isEventDriven, targetQueue, ops, requestStorageDisconnect } : ICheckFencingTokenValidity) {
    if(isEventDriven && executionOwner == "trigger") {
        if(!fencingToken || fencingToken == "NOT_INCLUDED") {
            const errorMsg = `[EventDrivenPoller]-[ExecutionTrigger]-[${targetQueue}] : Engine execution rejected: Fencing token is missing.`;
            console.error(errorMsg);

            await requestStorageDisconnect();

            return {
                message: errorMsg,
                status: 200
            }
        }

        const isValidToken = await ops.checkFencingTokenValidity(targetQueue, fencingToken);

        if(!isValidToken) {
            const errorMsg = `[EventDrivenPoller]-[ExecutionTrigger]-[${targetQueue}] : Engine execution rejected : Invalid fencing token.`;
            console.error(errorMsg);

            await requestStorageDisconnect();
            
            return {
                message: errorMsg,
                status: 200
            }
        }

        else {
            console.log("[EventDrivenPoller] : Engine started via DB trigger", {
                queue: targetQueue,
                currentToken: fencingToken,
                previousToken: isNaN(parseInt(fencingToken, 10)) ? null : parseInt(fencingToken, 10) - 1
            })
        }
    }
}