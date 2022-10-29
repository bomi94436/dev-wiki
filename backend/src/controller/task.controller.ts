import { RequestHandler } from 'express'
import TaskRepositoryImpl from 'repository/task.repository.impl'
import TaskService from 'services/task.service'

class TaskController {
  private taskService: TaskService

  constructor() {
    const taskRepository = new TaskRepositoryImpl()
    this.taskService = new TaskService(taskRepository)
  }

  public getTasks: RequestHandler = async (req, res, next) => {
    const taskCardId = Number(req.params.taskCardId)
    const tasks = await this.taskService.getTasks(taskCardId)

    if (tasks) {
      res.status(200).json({
        message: 'success get tasks',
        tasks,
      })
    } else {
      res.status(404).json({
        message: 'fail get tasks',
      })
    }
  }
}

export default TaskController
