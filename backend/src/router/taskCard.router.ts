import express from 'express'
import TaskController from 'controller/task.controller'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'

const taskCardRouter = express.Router()
const taskController = new TaskController()

taskCardRouter.get(
  '/:taskCardId/task',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => taskController.getTasks(req, res, next))
)

export default taskCardRouter
