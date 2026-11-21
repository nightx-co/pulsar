-- KEYS[1]: IDP lock key
-- KEYS[2]: EDP lock key prefix
-- ARGV[1]: queue name
-- ARGV[2]: pooler type
-- ARGV[3]: total jobs (ready + delayed)
-- ARGV[4]: continuation owner id
-- ARGV[5]: dispatch-pending TTL (ms)

local idpLockKey = KEYS[1]
local edpLockPrefix = KEYS[2]
local queueName = ARGV[1]
local poolerType = ARGV[2]
local totalJobs = tonumber(ARGV[3])
local continuationOwnerId = ARGV[4]
local dispatchTtlMs = tonumber(ARGV[5])

if poolerType == "interval-driven-pooler" then
    local idpOwner = redis.call("GET", idpLockKey)
    
    -- No lock: an external invocation may be started.
    if not idpOwner then
        return "ALLOWED"
    end

    -- The current lock belongs to the engine continuation.
    -- Allow the continuation to proceed.
    if idpOwner == continuationOwnerId then
        return "ALLOWED"
    end

    return "IDP_LOCKED"

elseif poolerType == "event-driven-pooler" then     
    if totalJobs <= 0 then
        return "NO_JOBS"
    end

    local edpLockKey = edpLockPrefix .. queueName
    local dispatchKey = edpLockKey .. ":pending"

    local edpOwner = redis.call("GET", edpLockKey)

    -- The current execution already owns this queue lock.
    if edpOwner then
        if edpOwner == continuationOwnerId then
            return "ALLOWED"
        end

        return "EDP_LOCKED"
    end

    -- A previous dispatch has not landed yet.
    local dispatchPending = redis.call("GET", dispatchKey)
    
    if dispatchPending then
        return "EDP_DISPATCH_PENDING"
    end

    -- Reserve the dispatch slot atomically.
    redis.call("SET", dispatchKey, "1", "PX", dispatchTtlMs)

    return "ALLOWED"
end

return "UNKNOWN_POOLER"