import express from 'express'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'

import TaskController from 'controller/task.controller'
import TaskCardController from 'controller/taskCard.controller'

const taskCardRouter = express.Router()
const taskController = new TaskController()
const taskCardController = new TaskCardController()

taskCardRouter.get(
  '/',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => taskCardController.getTaskCards(req, res, next))
)

taskCardRouter.post(
  '/',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => taskCardController.createTaskCard(req, res, next))
)

taskCardRouter.get(
  '/:taskCardId',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => taskCardController.getTaskCard(req, res, next))
)

taskCardRouter.get(
  '/:taskCardId/task',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => taskController.getTasks(req, res, next))
)

export default taskCardRouter
