import { RequestHandler } from 'express'
import { CustomError } from '../../global/utils'

export const checkIsLoggedInUser: RequestHandler = (req, res, next) => {
  if (!req.session.userid) {
    throw new CustomError(401, 'required login')
  }
  next()
}

export const checkIsNotLoggedInUser: RequestHandler = (req, res, next) => {
  if (req.session.userid) {
    throw new CustomError(401, 'required not login')
  }
  next()
}
