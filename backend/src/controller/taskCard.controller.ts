import { RequestHandler } from 'express'
import TaskCardRepositoryImpl from 'repository/taskCard.repository.impl'
import TaskCardService from 'services/taskCard.service'

class TaskCardController {
  private taskCardService: TaskCardService
  constructor() {
    const taskCardRepository = new TaskCardRepositoryImpl()
    this.taskCardService = new TaskCardService(taskCardRepository)
  }

  public createTaskCard: RequestHandler = async (req, res, next) => {
    const { name, description } = req.body
    const taskCard = await this.taskCardService.createTaskCard({ name, description })

    if (taskCard) {
      res.status(201).json({
        message: 'success create task card',
        task_card: taskCard,
      })
    } else {
      res.status(500).json({
        message: 'fail create task card',
      })
    }
  }

  public getTaskCards: RequestHandler = async (req, res, next) => {
    const taskCards = await this.taskCardService.getTaskCards(req.query)

    res.status(200).json({
      message: 'success get task cards',
      task_cards: taskCards,
    })
  }

  public getTaskCard: RequestHandler = async (req, res, next) => {
    const taskCardId = Number(req.params.taskCardId)
    const taskCard = await this.taskCardService.getTaskCard({ id: taskCardId })

    res.status(200).json({
      message: 'success get task card',
      task_card: taskCard,
    })
  }
}

export default TaskCardController
