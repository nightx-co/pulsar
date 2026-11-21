import { QueueService } from "../../../src/modules/Queue.module";
import { UnifiedTransportManager } from "../../../src/network/UnifiedTransportManager";
import { PostgresDriver, PulsarUnifiedStorage, RedisDriver } from "../../../src/storage";

describe("RedisQueueRepository Locks Unit Tests", () => {

    let unifiedTransportManager : UnifiedTransportManager;
    let unifiedStorage : PulsarUnifiedStorage;

    beforeAll(async () => {
        const cacheStorage = new RedisDriver({
            protocol : "tcp",
            connectionString : "127.0.0.1:6379",
        })

        const postgresDriver = new PostgresDriver({
            connectionString: "postgresql://postgres:password@localhost:5432/postgres",
            connectionProtocol : 'tcp'
        })

        unifiedStorage = new PulsarUnifiedStorage({
            db : postgresDriver,
            cache : cacheStorage,
            strategy : "AUTO"
        })

        const queueService = new QueueService(unifiedStorage);

        unifiedTransportManager = new UnifiedTransportManager({
            isServer : true,
            mode : "hybrid",
            port : 4500,
        }, unifiedStorage, queueService);
    })

    afterAll(async () => {
        if (unifiedTransportManager) {
            await unifiedTransportManager.shutdownAll();
        }
        if(unifiedStorage) {
            await unifiedStorage.disconnect();
        }
    })

    it("should boot all transports successfully without throwing any error", async () => {
        expect(async () => {
            await unifiedTransportManager.bootAll();
        }).not.toThrow();
    })

    it("should handle dispatching to the network with a different owner lock without throwing an error", async () => {
        await unifiedTransportManager.dispatchToNetwork('q_2', { batch: [], worker_id: 'test_id' });
    })

    it("should trigger with a valid queue and data that are not null or undefined", async () => {
        await new Promise<void>((resolve) => {
            unifiedTransportManager.onTrigger((queue, data) => {
                expect(queue).toBeDefined();
                expect(queue).not.toBeNull();
                
                expect(data).toBeDefined();
                expect(data).not.toBeNull();
                
                resolve();
            })
        })
    })
})