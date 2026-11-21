import { describe, it, expect } from "vitest";
import { PulsarUnifiedStorage } from "../src/storage/PulsarStorage";
import { PostgresQueueRepository } from "../src/storage/repositories/PostgresQueueRepository";
import { RedisQueueRepository } from "../src/storage/repositories/RedisQueueRepository";

describe("PulsarUnifiedStorage Unit Test", () => {
    it("should throw an error if PostgresDriver is missing", () => {
        expect(() => {
            new PulsarUnifiedStorage({ db: undefined as any });
        }).toThrow("[PulsarUnifiedStorage] PostgresDriver is required");
    });

    it("should resolve to PG_UNLOGGED strategy by default when cache is not provided", () => {
        const mockDb = { setKeyPrefix: () => {} } as any;
        const storage = new PulsarUnifiedStorage({ db: mockDb });

        expect(storage.strategy).toBe("PG_UNLOGGED");
        expect(storage.repository).toBeInstanceOf(PostgresQueueRepository);
    });

    it("should resolve to REDIS_CACHE strategy when cache is provided and strategy is AUTO", () => {
        const mockDb = { setKeyPrefix: () => {} } as any;
        const mockCache = { setKeyPrefix: () => {}, options : { protocol : 'TCP' } } as any;
        const storage = new PulsarUnifiedStorage({ db: mockDb, cache: mockCache, strategy: "AUTO" });

        expect(storage.strategy).toBe("REDIS_CACHE");
        expect(storage.repository).toBeInstanceOf(RedisQueueRepository);
    });

    it("should throw an error if REDIS_CACHE is selected without a cache driver", () => {
        const mockDb = { setKeyPrefix: () => {} } as any;
        expect(() => {
            new PulsarUnifiedStorage({ db: mockDb, strategy: "REDIS_CACHE" });
        }).toThrow("requires a valid Redis cache driver");
    })
})