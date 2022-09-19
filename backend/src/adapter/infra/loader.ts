import express from 'express'
import expressLoader from './express/express.loader'
import mysqlLoader from './mysql/mysql.loader'
import redisLoader from './redis/redis.loader'

const loaders = {
  init: async ({ app }: { app: express.Express }) => {
    await mysqlLoader()
    await redisLoader()
    await expressLoader({ app })
  },
}

export default loaders
