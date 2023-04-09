import express from 'express'
import { TaskController } from 'controller'
import { checkIsLoggedInUser } from '../middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'
import taskValidator from 'middleware/vaildator/task.validator'

const taskRouter = express.Router()
const taskController = new TaskController()

taskRouter.post(
  '/',
  checkIsLoggedInUser,
  taskValidator.create,
  asyncMiddleware(taskController.createTask)
)

taskRouter.patch(
  '/:taskId',
  checkIsLoggedInUser,
  taskValidator.update,
  asyncMiddleware(taskController.updateTask)
)

taskRouter.delete('/:taskId', checkIsLoggedInUser, asyncMiddleware(taskController.deleteTask))

export default taskRouter
