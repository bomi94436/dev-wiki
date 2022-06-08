import express from 'express'
import loaders from './loaders/index'

const startServer = async () => {
  const app = express()
  const port = process.env.PORT || 5001

  loaders.init({ app })

  app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
  })
}

startServer()
