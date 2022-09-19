import express from 'express'
import { asyncMiddleware } from '../../global/utils'
import UserController from '../controller/user.controller'

const userRouter = express.Router()
const userController = new UserController()

userRouter.get(
  '/me',
  asyncMiddleware((req, res, next) => userController.me(req, res, next))
)

export default userRouter
