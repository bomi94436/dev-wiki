import express from 'express'
import { authController } from '../controllers'
import { asyncMiddleware } from '../utils'

const authRouter = express.Router()

authRouter.post('/signup', asyncMiddleware(authController.signup))
authRouter.post('/login')
authRouter.post('/logout')

export default authRouter
