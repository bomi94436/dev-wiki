import { RequestHandler, Request, Response, NextFunction } from 'express'

export const asyncMiddleware =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

export class CustomError extends Error {
  constructor(public status: number = 500, ...params: any) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
  }
}
