import express from 'express'
import { AuthController } from 'controller'
import { asyncMiddleware } from 'global/utils'
import authValidator from 'middleware/vaildator/auth.validator'

const authRouter = express.Router()
const authController = new AuthController()

authRouter.post(
  '/signup',
  authValidator.signup,
  asyncMiddleware((req, res, next) => authController.signup(req, res, next))
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
