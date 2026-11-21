-- KEYS[1]: Lock key
-- ARGV[1]: Isolate Owner ID

local lockKey = KEYS[1]
local ownerId = ARGV[1]

if redis.call("GET", lockKey) == ownerId then
    return redis.call("DEL", lockKey)
else
    return 0
end