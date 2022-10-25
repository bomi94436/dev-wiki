import { RequestHandler } from 'express'

type RootControllerKeys = 'healthCheck'

const rootController: {
  [key in RootControllerKeys]: RequestHandler
} = {
  healthCheck: (req, res, next) => {
    res.status(200).send(`i'm alive !`)
  },
}

export default rootController
