import express from 'express'
import { authController } from '../controller'
import { asyncMiddleware } from '../../utils'
import authValidator from '../middleware/vaildator/auth.validator'

const authRouter = express.Router()

authRouter.post(
  '/signup',
  authValidator.signup,
  asyncMiddleware(authController.signup)
)
authRouter.post('/login', asyncMiddleware(authController.login))
authRouter.post('/logout', asyncMiddleware(authController.logout))

export default authRouter
