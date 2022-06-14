import express from 'express'
import expressLoader from './expressLoader'
import mysqlLoader from './mysql/mysqlLoader'

const loaders = {
  init: async ({ app }: { app: express.Express }) => {
    await mysqlLoader()
    await expressLoader({ app })
  },
}

export default loaders
