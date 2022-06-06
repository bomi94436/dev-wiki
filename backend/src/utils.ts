import { RequestHandler, Request, Response, NextFunction } from 'express'

export const wrapAsync =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }
