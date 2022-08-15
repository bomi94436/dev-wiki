import express from 'express'
import expressLoader from './express/loader'
import mysqlLoader from './mysql/loader'
import redisLoader from './redis/loader'

const loaders = {
  init: async ({ app }: { app: express.Express }) => {
    await mysqlLoader()
    await redisLoader()
    await expressLoader({ app })
  },
}

export default loaders
