import { createClient } from 'redis'
import config from '../../config'

export const redisClient = createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
  legacyMode: true,
})
redisClient.connect().catch(console.error)
