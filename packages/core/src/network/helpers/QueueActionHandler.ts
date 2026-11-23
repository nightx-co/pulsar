import { decode } from "@msgpack/msgpack";
import { QueueService } from "@package/src/modules/Queue.module";
import type { PulsarUnifiedStorage } from "@package/src/storage";
import type { ILogger } from "@package/src/integrations";
import type { ResponseHeaders } from "@package/src/server/utility/extract-headers";

export type StandardResponse = { status : number; message : string | Record<string, any> };
type Action = "ACK" | "NACK" | "RETRY" | "DEREGISTER";

const ROUTES : Array<[string, Action]> = [
    ["/ack", "ACK"],
    ["/nack", "NACK"],
    ["/retry", "RETRY"],
    ["/deregister", "DEREGISTER"]
]

const OK_MESSAGES : Record<Action, string> = {
    ACK: "Jobs Acknowledged",
    NACK: "Jobs Nack Applied",
    RETRY: "Jobs Retry Applied",
    DEREGISTER: "Worker Deregistered",
}

interface QueueActionDeps {
    storage : PulsarUnifiedStorage;
    logger : ILogger;
    getApiKey? : () => string | undefined;
    ensureReady? : () => Promise<void>;
}

export class QueueActionHandler {
    constructor(private readonly deps : QueueActionDeps) {}

    public async tryHandle(input : { pathname : string; method : string; headers : ResponseHeaders; body : any }) : Promise<StandardResponse | null> {
        if (input.method !== "POST") return null;

        const action = ROUTES.find(([suffix]) => input.pathname.endsWith(suffix))?.[1];
        if (!action) return null;

        const { headers } = input;
        const queue = headers.targetQueue;
        const workerId = headers.workerId ?? "";

        const authError = this.checkAuth(headers.apiKey);
        if (authError) return authError;

        if (!queue) return this.badRequest("Target queue is missing in headers");
        
        if (!workerId && action === "DEREGISTER") {
            return this.badRequest("Worker ID is missing in headers");
        }

        let messageIds : number[] = [];

        if (action !== "DEREGISTER") {
            try {
                messageIds = this.extractMessageIds(input.body);
            }
            catch (err : any) {
                return this.badRequest(err.message);
            }
            if (messageIds.length === 0) return this.badRequest("No message ids were found");
        }

        try {
            await this.deps.ensureReady?.();
            await this.run(action, queue, workerId, messageIds);
            return { status: 200, message: OK_MESSAGES[action] };
        }
        catch (error) {
            this.deps.logger.error(`[QueueAction] ${action} failed for queue [${queue}]:`, error);
            return { status: 500, message: { error: "INTERNAL_ERROR", message: `${action} failed` } };
        }
    }

    private async run(action : Action, queue : string, workerId : string, ids : number[]) {
        const { storage } = this.deps;
        const queueService = new QueueService(storage);
        
        switch (action) {
            case "ACK": await queueService.ackBatch(queue, ids); break;
            case "NACK": await queueService.nackBatch(queue, ids); break;
            case "RETRY": await queueService.retryBatch(queue, ids); break;
            case "DEREGISTER": await storage.repository.deregisterWorker(workerId, queue); break;
        }
    }

    private checkAuth(apiKey? : string) : StandardResponse | null {
        const expected = this.deps.getApiKey?.();
        if (expected === undefined) return null;

        if (!apiKey || apiKey !== expected) {
            this.deps.logger.error(`[QueueAction] Missing or invalid API key.`);
            return { status: 401, message: { error: "UNAUTHORIZED", message: "Missing or invalid API key" } };
        }
        return null;
    }

    private badRequest(message : string) : StandardResponse {
        return { status: 400, message: { error: "BAD_REQUEST", message } };
    }

    private extractMessageIds(rawBody : any) : number[] {
        let body = rawBody;
        
        if (typeof body === "string") body = JSON.parse(body);
        else if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) body = decode(body as any);

        const raw = Array.isArray(body?.msg_ids) ? body.msg_ids : [];
        
        return raw.map((id : unknown) => {
            const num = typeof id === "string" && id.trim() !== "" ? Number(id) : typeof id === "number" ? id : Number.NaN;
            if (!Number.isSafeInteger(num) || num < 0) throw new Error("INVALID_MSG_ID");
            return num;
        })
    }
}