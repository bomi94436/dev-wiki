import { RequestHandler } from 'express'
import TaskCardRepositoryImpl from 'repository/taskCard.repository.impl'
import TaskCardService from 'services/taskCard.service'
import { ItemResponse, ItemsResponse } from './types'
import { TaskCard } from 'domain/taskCard/taskCard.entity'

interface TaskCardReqParams {
  taskCardId?: number
}
type GetTaskCardsReqQuery = Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
type UpdateTaskCardsReqBody = Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>

class TaskCardController {
  private taskCardService: TaskCardService
  constructor() {
    const taskCardRepository = new TaskCardRepositoryImpl()
    this.taskCardService = new TaskCardService(taskCardRepository)
  }

  public createTaskCard: RequestHandler<{}, ItemResponse<TaskCard>> = async (req, res, next) => {
    const { name, description } = req.body
    const taskCard = await this.taskCardService.createTaskCard({ name, description })

    if (taskCard) {
      res.status(201).json(taskCard)
    } else {
      res.status(500).json({
        message: 'fail create task card',
      })
    }
  }

  public getTaskCards: RequestHandler<{}, ItemsResponse<TaskCard>, {}, GetTaskCardsReqQuery> =
    async (req, res, next) => {
      const taskCards = await this.taskCardService.getTaskCards(req.query)

      res.status(200).json({
        items: taskCards,
      })
    }

  public getTaskCard: RequestHandler<TaskCardReqParams, ItemResponse<TaskCard>> = async (
    req,
    res
  ) => {
    const taskCardId = Number(req.params.taskCardId)
    const taskCard = await this.taskCardService.getTaskCard({ id: taskCardId })

    if (taskCard) {
      res.status(200).json(taskCard)
    } else {
      res.status(500).json({
        message: 'fail get task card',
      })
    }
  }

  public updateTaskCard: RequestHandler<
    TaskCardReqParams,
    ItemResponse<TaskCard>,
    UpdateTaskCardsReqBody
  > = async (req, res, next) => {
    const taskCardId = Number(req.params.taskCardId)
    const taskCard = await this.taskCardService.updateTaskCard(taskCardId, req.body)

    if (taskCard) {
      res.status(200).json(taskCard)
    } else {
      res.status(500).json({
        message: 'fail udpate task card',
      })
    }
  }

  public deleteTaskCard: RequestHandler<TaskCardReqParams> = async (req, res, next) => {
    const taskCardId = Number(req.params.taskCardId)
    await this.taskCardService.deleteTaskCard({ id: taskCardId })

    res.status(204).send()
  }
}

export default TaskCardController
