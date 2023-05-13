import express from 'express'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'
import { TaskCardController, TaskController } from 'controller'
import taskCardValidator from 'middleware/vaildator/taskCard.validator'

const taskCardRouter = express.Router()
const taskController = new TaskController()
const taskCardController = new TaskCardController()

taskCardRouter.get('/', checkIsLoggedInUser, asyncMiddleware(taskCardController.getTaskCards))

taskCardRouter.post(
  '/',
  checkIsLoggedInUser,
  taskCardValidator.create,
  asyncMiddleware(taskCardController.createTaskCard)
)

taskCardRouter.get(
  '/:taskCardId',
  checkIsLoggedInUser,
  asyncMiddleware(taskCardController.getTaskCard)
)

taskCardRouter.patch(
  '/:taskCardId',
  checkIsLoggedInUser,
  taskCardValidator.update,
  asyncMiddleware(taskCardController.updateTaskCard)
)

taskCardRouter.delete(
  '/:taskCardId',
  checkIsLoggedInUser,
  asyncMiddleware(taskCardController.deleteTaskCard)
)

taskCardRouter.get(
  '/:taskCardId/task',
  checkIsLoggedInUser,
  asyncMiddleware(taskController.getTasks)
)

export default taskCardRouter
