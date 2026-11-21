--[[
 * Lua Script for Resetting Allocated Worker Slots:
 * 1. Reads all fields (worker IDs) from the queue worker registry hash.
 * 2. Removes all corresponding global worker entries from the global registry hash,
 *    in chunks so large swarms never hit Lua's unpack() limit.
 * 3. Deletes the entire queue worker registry key.
 * KEYS[1]: queueRegistryKey (e.g., prefix:queues:my-queue:worker_registry)
 * KEYS[2]: globalRegistryKey (e.g., prefix:global_worker_registry)
]]

local queueKey = KEYS[1]
local globalKey = KEYS[2]

local CHUNK_SIZE = 500

local workers = redis.call('HKEYS', queueKey)
local total = #workers

local i = 1
while i <= total do
    local globalKeysToRemove = {}
    local last = math.min(i + CHUNK_SIZE - 1, total)

    for j = i, last do
        globalKeysToRemove[#globalKeysToRemove + 1] = queueKey .. ':' .. workers[j]
    end

    redis.call('HDEL', globalKey, unpack(globalKeysToRemove))
    i = last + 1
end

redis.call('DEL', queueKey)
return 1