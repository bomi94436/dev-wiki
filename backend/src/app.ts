import express, { ErrorRequestHandler } from 'express'
import loaders from './loaders/index'

const startServer = async () => {
  const app = express()
  const port = process.env.PORT || 5001

  loaders.init({ app })

  app.use(<ErrorRequestHandler>((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  }))

  app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
  })
}

startServer()
