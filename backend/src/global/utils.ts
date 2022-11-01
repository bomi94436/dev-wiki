import { RequestHandler } from 'express'
import path from 'path'

export const asyncMiddleware =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
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

export const getProjectRootPath = (dirname: string) => dirname.slice(0, dirname.lastIndexOf('/src'))

export const getRelativePathOfProjectRootPath = (dirname: string) =>
  path.relative(dirname, getProjectRootPath(dirname))
