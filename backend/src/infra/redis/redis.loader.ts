import { redisClient } from './usecase'

const redisLoader = async () => {
  redisClient.on('error', (err) => {
    console.error(err)
    throw err
  })

  redisClient.on('ready', async () => {
    console.log('Redis is ready')
  })
}

export default redisLoader
