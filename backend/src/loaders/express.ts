import { Express } from 'express'
import { rootRouter } from '../routes'

export const expressLoader = async ({ app }: { app: Express }) => {
  app.use('/', rootRouter)
}
