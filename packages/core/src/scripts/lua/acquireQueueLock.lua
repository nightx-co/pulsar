local lockKey = KEYS[1]
local ownerId = ARGV[1]
local ttl = tonumber(ARGV[2])

local currentOwner = redis.call("GET", lockKey)

if not currentOwner then
    redis.call("SET", lockKey, ownerId, "PX", ttl)
    return 1
elseif currentOwner == ownerId then
    redis.call("PEXPIRE", lockKey, ttl)
    return 1
else
    return 0
end