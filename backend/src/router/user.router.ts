import express from 'express'
import { UserController } from 'controller'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'

const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/me', checkIsLoggedInUser, asyncMiddleware(userController.me))

export default userRouter
