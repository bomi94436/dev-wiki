import express from 'express'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'

import TaskController from 'controller/task.controller'
import TaskCardController from 'controller/taskCard.controller'

const taskCardRouter = express.Router()
const taskController = new TaskController()
const taskCardController = new TaskCardController()

taskCardRouter.get('/', checkIsLoggedInUser, asyncMiddleware(taskCardController.getTaskCards))

// TODO: validation
taskCardRouter.post('/', checkIsLoggedInUser, asyncMiddleware(taskCardController.createTaskCard))

taskCardRouter.get(
  '/:taskCardId',
  checkIsLoggedInUser,
  asyncMiddleware(taskCardController.getTaskCard)
)

// // TODO: validation
taskCardRouter.patch(
  '/:taskCardId',
  checkIsLoggedInUser,
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
