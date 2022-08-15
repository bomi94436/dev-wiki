import express, { ErrorRequestHandler, Express } from 'express'
import { authRouter, rootRouter } from '../../routes'

const expressLoader = async ({ app }: { app: Express }) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use('/', rootRouter)
  app.use('/auth', authRouter)

  app.use(<ErrorRequestHandler>((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message })
  }))
}

export default expressLoader
