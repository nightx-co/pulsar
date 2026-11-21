import { describe, it, expect, mock } from "bun:test";
import { HttpWorker } from "../src/class/http-worker";

describe("HttpWorker Unit Test", () => {
    it("should return 400 if x-instance-id header is missing on /dispatch", async () => {
        const worker = new HttpWorker("test-queue", {
            apiKey: "secret-key",
            storage: { db: {} as any }
        })

        const req = new Request("http://localhost/dispatch", {
            method: "POST",
            headers: { "x-api-key": "secret-key" },
            body: JSON.stringify({ batch: [], worker_id: "w-1" })
        })

        const res: any = await worker.handle(req, async () => {});
        expect(res.status).toBe(400);
        expect(res.message).toContain("Instance ID is required");
    })

    it("should return 401 if API key is invalid", async () => {
        const worker = new HttpWorker("test-queue", {
            apiKey: "secret-key",
            storage: { db: {} as any }
        })

        const req = new Request("http://localhost/dispatch", {
            method: "POST",
            headers: { 
                "x-instance-id": "instance-1",
                "x-api-key": "wrong-key" 
            },
            body: JSON.stringify({ batch: [], worker_id: "w-1" })
        })

        const res: any = await worker.handle(req, async () => {});
        expect(res.status).toBe(401);
        expect(res.message).toContain("Unauthorized");
    })
})