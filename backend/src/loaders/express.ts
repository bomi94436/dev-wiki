import express from 'express'

export const expressLoader = async ({ app }: { app: express.Express }) => {
  app.get('/', (req, res) => {
    res.status(200).send('hello !')
  })
}
