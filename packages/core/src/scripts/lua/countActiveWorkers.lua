-- KEYS[1]: worker registry hash (workerId -> expireAtMs)
-- ARGV[1]: now (ms), passed by the caller so it matches registerWorkers
-- Returns the number of live (non-expired) entries and purges expired ones.
-- Replaces HLEN, which can include expired-but-not-yet-reclaimed fields.

local key = KEYS[1]
local now = tonumber(ARGV[1])

-- Fallback to the server clock if the caller didn't pass a timestamp
if not now then
    local t = redis.call('TIME')
    now = tonumber(t[1]) * 1000 + math.floor(tonumber(t[2]) / 1000)
end

local entries = redis.call('HGETALL', key)
local active = 0

for i = 1, #entries, 2 do
    local expireAt = tonumber(entries[i + 1]) or 0
    if expireAt <= now then
        redis.call('HDEL', key, entries[i])
    else
        active = active + 1
    end
end

return active