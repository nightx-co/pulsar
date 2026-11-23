--[[
 * Lua Script for Atomic Multi-Queue Worker Registration (Redis 7.2 compatible):
 * 1. Purges expired workers from the target Queue Hash and the Global Hash
 *    (manual purge, since hash-field expiration is not available before 7.4).
 * 2. Checks active counts against both queue-level and swarm-level global concurrency.
 * 3. Atomic check: slotsAvailable = MIN(localSlots, globalSlots).
 * 4. Grants candidate IDs up to slotsAvailable and registers them in both hashes.
 * 5. Returns array of granted worker IDs.
]]

local queueKey = KEYS[1]
local globalKey = KEYS[2]

local localConcurrency = tonumber(ARGV[1])
local globalConcurrency = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local ttlMs = tonumber(ARGV[4])

local newExpireAt = now + ttlMs

-- 1. Purge expired workers from the Queue Hash and count the active ones
local localEntries = redis.call('HGETALL', queueKey)
local localActiveCount = 0

for i = 1, #localEntries, 2 do
    local workerId = localEntries[i]
    local expireAt = tonumber(localEntries[i + 1]) or 0

    if expireAt <= now then
        redis.call('HDEL', queueKey, workerId)
    else
        localActiveCount = localActiveCount + 1
    end
end

-- 2. Purge expired workers from the Global Hash and count the active ones
local globalEntries = redis.call('HGETALL', globalKey)
local globalActiveCount = 0

for i = 1, #globalEntries, 2 do
    local globalWorkerId = globalEntries[i]
    local expireAt = tonumber(globalEntries[i + 1]) or 0

    if expireAt <= now then
        redis.call('HDEL', globalKey, globalWorkerId)
    else
        globalActiveCount = globalActiveCount + 1
    end
end

-- 3. Check active count against Global Concurrency
local globalAvailable = globalConcurrency - globalActiveCount

if globalAvailable <= 0 then
    return {}
end

-- 4. Check active count against Queue Local Concurrency
local localAvailable = localConcurrency - localActiveCount

if localAvailable <= 0 then
    return {}
end

-- 5. Calculate true atomic capacity
local availableSlots = math.min(globalAvailable, localAvailable)

-- 6. Grant candidate worker IDs up to available capacity
local grantedWorkers = {}
local candidateCount = #ARGV - 4
local toGrant = math.min(availableSlots, candidateCount)

for i = 1, toGrant do
    local candidateId = ARGV[4 + i]

    -- A global ID must be unique across every queue
    local globalWorkerId = queueKey .. ':' .. candidateId

    -- Register in Queue Hash (value = expiration timestamp)
    redis.call('HSET', queueKey, candidateId, newExpireAt)

    -- Register in Global Hash (value = expiration timestamp)
    redis.call('HSET', globalKey, globalWorkerId, newExpireAt)

    table.insert(grantedWorkers, candidateId)
end

return grantedWorkers