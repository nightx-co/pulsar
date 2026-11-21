local val = redis.call('GET', KEYS[1])
if val == 'true' or val == '1' then
    return 1
else
    return 0
end