import { RequestHandler, Request, Response, NextFunction } from 'express'
import { parse as uuidParse } from 'uuid'

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

export const parseUuidToBinary = (id: string) =>
  Buffer.from(Object.values(uuidParse(id)))
