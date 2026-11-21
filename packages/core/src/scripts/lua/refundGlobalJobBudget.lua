local key = KEYS[1]
local refund = tonumber(ARGV[1])
local current = tonumber(redis.call('GET', key) or "0")

if current > 0 then
    local new_val = math.max(0, current - refund)
    redis.call('SET', key, new_val, 'KEEPTTL')
end