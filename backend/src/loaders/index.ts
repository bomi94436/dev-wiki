import express from 'express'
import { expressLoader } from './express'
import { mysqlLoader } from './mysql'

const loaders = {
  init: async ({ app }: { app: express.Express }) => {
    await mysqlLoader()
    await expressLoader({ app })
  },
}

export default loaders
