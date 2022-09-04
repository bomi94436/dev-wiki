import express from 'express'
import { asyncMiddleware } from '../../utils'
import authValidator from '../middleware/vaildator/auth.validator'
import AuthController from '../controller/auth.controller'

const authRouter = express.Router()
const authController = new AuthController()

authRouter.post(
  '/signup',
  authValidator.signup,
  asyncMiddleware(asyncMiddleware((req, res, next) => authController.signup(req, res, next)))
)
authRouter.post(
  '/login',
  asyncMiddleware((req, res, next) => authController.login(req, res, next))
)
authRouter.post(
  '/logout',
  asyncMiddleware((req, res, next) => authController.logout(req, res, next))
)

export default authRouter
