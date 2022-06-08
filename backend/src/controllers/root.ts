import { Request, Response, NextFunction } from 'express'

const rootController = {
  healthCheck: (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(`i'm alive !`)
  },
}

export default rootController
