import express, { ErrorRequestHandler } from 'express'
import loaders from './loaders/index'

const startServer = async () => {
  const app = express()
  const port = process.env.PORT || 5001

  loaders.init({ app })

  app.use(<ErrorRequestHandler>((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message })
  }))

  app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
  })
}

startServer()
