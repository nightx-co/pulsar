-- KEYS[1]: window key prefix (e.g. "pulsar::global:job_budget"); window second is appended here
-- ARGV[1]: requested
-- ARGV[2]: limit per window
-- Returns: { granted, windowSecond }
--
-- The window is derived from the Redis server clock and RETURNED, so the caller
-- can refund against the exact window it claimed from (even if the second rolls over).

local prefix = KEYS[1]
local requested = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])

local t = redis.call('TIME')
local window = tostring(t[1])
local key = prefix .. ':' .. window

local current = tonumber(redis.call('GET', key) or "0")
local remaining = limit - current

if remaining <= 0 then
    return { 0, window }
end

local granted = math.min(requested, remaining)
redis.call('INCRBY', key, granted)

-- Keep the window key alive for 2 seconds. Check TTL instead of "current == 0"
-- so a key is never left without an expiry.
if redis.call('TTL', key) == -1 then
    redis.call('EXPIRE', key, 2)
end

return { granted, window }