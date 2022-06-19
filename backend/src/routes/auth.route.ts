import express from 'express'
import { authController } from '../controllers'
import { asyncMiddleware } from '../utils'
import authValidator from '../vaildator/auth.validator'

const authRouter = express.Router()

authRouter.post(
  '/signup',
  authValidator.signup,
  asyncMiddleware(authController.signup)
)
authRouter.post('/login')
authRouter.post('/logout')

export default authRouter
