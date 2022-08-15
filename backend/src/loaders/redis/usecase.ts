import * as redis from 'redis'
import config from '../../config'

export const redisClient = redis.createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
})
