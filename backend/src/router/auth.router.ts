import express from 'express'
import { AuthController } from 'controller'
import { asyncMiddleware } from 'global/utils'
import authValidator from 'middleware/vaildator/auth.validator'

const authRouter = express.Router()
const authController = new AuthController()

authRouter.post('/signup', authValidator.signup, asyncMiddleware(authController.signup))

authRouter.post('/login', asyncMiddleware(authController.login))

authRouter.post('/logout', asyncMiddleware(authController.logout))

export default authRouter
