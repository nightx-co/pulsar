import { describe, it, expect, mock } from "bun:test";
import { BaseWorker } from "../src/base-worker";
import { Job } from "../src/Job";
import type { BaseOptions, IWorkerTransport, Processor } from "../src/types/worker.types.js";

class TestWorker extends BaseWorker {
    protected transport : IWorkerTransport = {
        connect: mock(async () => {}),
        ack: mock(async () => {}),
        nack: mock(async () => {}),
        retry: mock(async () => {}),
        deregister: mock(async () => {})
    }
}

describe("BaseWorker", () => {
    it("should process jobs with configured concurrency and dispatch deferred actions", async () => {
        const options : BaseOptions = { concurrency: 2, apiKey : '' };
        const worker = new TestWorker();

        const jobs = [
            new Job(1, { task: "A" }),
            new Job(2, { task: "B" })
        ]

        const processor : Processor = async (job) => {
            await job.ack(true);
        }

        await worker.handleProcesses("worker-123", jobs, processor);

        expect(worker["transport"].connect).toHaveBeenCalled();
        expect(worker["transport"].deregister).toHaveBeenCalledWith("worker-123");
        expect(worker["transport"].ack).toHaveBeenCalledWith("test-queue", [1, 2]);
    })
})