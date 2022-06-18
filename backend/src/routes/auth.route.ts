import express from 'express'
import { authController } from '../controllers'
import { asyncMiddleware } from '../utils'

const authRouter = express.Router()

// TODO: validate middleware 1. 필요한 파라미터들이 있는지 2. 컬럼 형식에 맞는지
authRouter.post('/signup', asyncMiddleware(authController.signup))
authRouter.post('/login')
authRouter.post('/logout')

export default authRouter
