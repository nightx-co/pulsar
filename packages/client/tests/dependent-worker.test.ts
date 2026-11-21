import { describe, it, expect, mock, beforeEach, afterEach } from "bun:test";
import { DependentWorker } from "../src/class/dependent-worker";
import msgpack from "@msgpack/msgpack";

describe("DependentWorker", () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        global.fetch = mock(async () => ({ ok: true })) as any;
    })

    afterEach(() => {
        global.fetch = originalFetch;
    })

    it("should send proxy request with msgpack encoding for ack", async () => {
        const worker = new DependentWorker("test-queue", {
            concurrency: 1,
            connection: { url: "http://localhost:8080", headers: { "authorization": "Bearer token" } }
        })

        await worker.ack("test-queue", [10, 20]);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        const [url, options] = (global.fetch as any).mock.calls[0];
        
        expect(url).toBe("http://localhost:8080/ack");
        expect(options.method).toBe("POST");
        expect(options.headers["x-target-queue"]).toBe("test-queue");
        expect(options.headers["x-action"]).toBe("ack");
        expect(options.headers["content-type"]).toBe("application/x-msgpack");

        const decodedBody = msgpack.decode(new Uint8Array(options.body));
        expect(decodedBody).toEqual({ msg_ids: [10, 20] });
    })

    it("should send deregister proxy request with x-worker-id header", async () => {
        const worker = new DependentWorker("test-queue", {
            concurrency: 1,
            connection: { url: "http://localhost:8080" }
        })

        await worker.deregister("worker-abc");

        const [url, options] = (global.fetch as any).mock.calls[0];
        expect(url).toBe("http://localhost:8080/deregister");
        expect(options.headers["x-worker-id"]).toBe("worker-abc");
    })
})