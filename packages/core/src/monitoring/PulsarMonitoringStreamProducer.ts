/*
import { Redis } from "ioredis";

const redis = new Redis("redis://host.docker.internal:6379", {
    maxRetriesPerRequest : null
});

export class PulsarMonitoringStreamProducer {
    constructor() {}

    public stream = {
        async base(eventName : string, payload : any) {
            try {
                const messageId = await redis.xadd(
                    "orders_stream",
                    "*",
                    "event", eventName,
                    "payload", JSON.stringify(payload)
                )

                return messageId;
            }
            catch (error) {
                console.error("[Publisher] Error publishing event:", error);
                throw error;
            }
        }         
    }

    public async streamX() {
        try {
            const messageId = await redis.xadd(
                "orders_stream",
                "*",
                "event", 'eventName',
                "payload", JSON.stringify({ message : 'hello', stats : {
                    cpu_usage: "12.34",
                    memory_usage: "56.78",
                    event: "Event Name",
                    description: "This is an example event description.",
                    timestamp: "2023-10-27T10:30:00Z",
                    request_id: "req-12345",
                    metadata: {
                        key1: "value1",
                        key2: "value2"
                    }
                } })
            );

            console.log(`[Publisher] Event published with ID: ${messageId}`);
            return messageId;
        }
        catch (error) {
            console.error("[Publisher] Error publishing event:", error);
            throw error;
        }
    }
}
*/