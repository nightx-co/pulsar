/*
import { Redis } from "ioredis";

const redis = new Redis();

const STREAM_KEY = "orders_stream";
const GROUP_NAME = "order_processing_group";
const CONSUMER_NAME = "vps_worker_1";

// Helper to reliably convert Buffer | string values into clean JS strings
function parseRedisString(val: any): string {
  if (Buffer.isBuffer(val)) {
    return val.toString("utf-8");
  }
  return String(val ?? "");
}

export class PulsarMonitoringStream {
  public async initConsumerGroup() {
    try {
      await redis.xgroup("CREATE", STREAM_KEY, GROUP_NAME, "0", "MKSTREAM");
      console.log(`[Init] Consumer group '${GROUP_NAME}' created successfully.`);
    } catch (err: any) {
      if (err.message?.includes("BUSYGROUP")) {
        console.log(`[Init] Consumer group '${GROUP_NAME}' already exists.`);
      } else {
        console.error("[Init] Error creating consumer group:", err);
      }
    }
  }

  public async startConsumer() {
    console.log(`[Consumer ${CONSUMER_NAME}] Worker started. Listening for messages...`);

    let checkPending = true;

    while (true) {
      try {
        // Read pending messages first ("0"). Once drained, switch to new messages (">").
        const streamIdToRead = checkPending ? "0" : ">";

        const response = (await redis.xreadgroup(
          "GROUP",
          GROUP_NAME,
          CONSUMER_NAME,
          "COUNT",
          10,
          "BLOCK",
          checkPending ? 0 : 2000, // Non-blocking when checking pending
          "STREAMS",
          STREAM_KEY,
          streamIdToRead
        )) as any;

        // If no pending messages found, switch mode to listen for NEW messages (">")
        if (!response || response.length === 0 || !response[0][1] || response[0][1].length === 0) {
          if (checkPending) {
            checkPending = false; // Drain complete, now switch to new messages
          }
          continue;
        }

        const streamMessages = response[0][1];

        for (const entry of streamMessages) {
          const messageId = parseRedisString(entry[0]);
          const fields = entry[1];

          if (!fields || fields.length === 0) continue;

          const dataMap: Record<string, string> = {};
          for (let i = 0; i < fields.length; i += 2) {
            const k = parseRedisString(fields[i]);
            const v = parseRedisString(fields[i + 1]);
            dataMap[k] = v;
          }

          const event = dataMap["event"] ?? "UNKNOWN";
          let payload: any = {};
          try {
            payload = dataMap["payload"] ? JSON.parse(dataMap["payload"]) : {};
          } catch {
            payload = dataMap["payload"];
          }

          console.log({
                event_id : event,
                payload : payload
          })

          // Execute event handler
          await this.handleOrderEvent(event, payload);

          // Acknowledge the message
          const ackResult = await redis.xack(STREAM_KEY, GROUP_NAME, messageId);
          //console.log(`[Consumer] ACK sent for ${messageId} (Result: ${ackResult})`);
        }
      } catch (error) {
        console.error("[Consumer Execution Error]:", error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  public async handleOrderEvent(event: string, payload: any) {
    
  }
}

export const stream = {
  async base(eventName: string, payload: any) {
    try {
      const messageId = await redis.xadd(
        STREAM_KEY,
        "MAXLEN",
        "~",
        10000, // Caps stream at ~10,000 entries to prevent memory leaks
        "*",
        "event",
        eventName,
        "payload",
        JSON.stringify(payload)
      );

      console.log(`[Publisher] Event '${eventName}' published with ID: ${messageId}`);
      return messageId;
    } catch (error) {
      console.error("[Publisher] Error publishing event:", error);
      throw error;
    }
  },
};

async function run() {
  const monitor = new PulsarMonitoringStream();
  await monitor.initConsumerGroup();
  await monitor.startConsumer();
}

run().catch((err) => {
  console.error("Fatal startup error:", err);
});
*/