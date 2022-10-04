import express from 'express'
import { asyncMiddleware } from '../../global/utils'
import { UserController } from '../controller'
import { checkIsLoggedInUser } from '../middleware/checkAuthentification'

const userRouter = express.Router()
const userController = new UserController()

userRouter.get(
  '/me',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => userController.me(req, res, next))
)

export default userRouter
