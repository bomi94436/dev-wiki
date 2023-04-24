import { RequestHandler } from 'express'

import TaskRepositoryImpl from 'repository/task.repository.impl'
import TaskCardRepositoryImpl from 'repository/taskCard.repository.impl'
import TaskService from 'services/task.service'
import { Task } from 'domain/taskCard/task.entity'
import { ItemResponse, ItemsResponse } from './types'
import { CreateTaskDTO, UpdateTaskDTO } from 'types/task.dto'

interface TaskReqParams {
  taskId?: number
}

class TaskController {
  private taskService: TaskService

  constructor() {
    const taskRepository = new TaskRepositoryImpl()
    const taskCardRepository = new TaskCardRepositoryImpl()
    this.taskService = new TaskService(taskRepository, taskCardRepository)
  }

  public createTask: RequestHandler<{}, ItemResponse<Task>, CreateTaskDTO> = async (
    req,
    res,
    next
  ) => {
    const task = await this.taskService.createTask(req.body)

    if (task) {
      res.status(201).json(task)
    } else {
      res.status(500).json({
        message: 'fail create task',
      })
    }
  }

  public getTasks: RequestHandler<{ taskCardId?: number }, ItemsResponse<Task>> = async (
    req,
    res,
    next
  ) => {
    const taskCardId = Number(req.params.taskCardId)
    const tasks = await this.taskService.getTasks(taskCardId)

    if (tasks) {
      res.status(200).json({
        items: tasks,
      })
    } else {
      res.status(404).json({
        message: 'fail get tasks',
      })
    }
  }

  public updateTask: RequestHandler<TaskReqParams, ItemResponse<Task>, UpdateTaskDTO> = async (
    req,
    res,
    next
  ) => {
    const taskId = Number(req.params.taskId)
    const task = await this.taskService.updateTask(taskId, req.body)

    if (task) {
      res.status(200).json(task)
    } else {
      res.status(500).json({
        message: 'fail udpate task',
      })
    }
  }

  public deleteTask: RequestHandler<TaskReqParams> = async (req, res, next) => {
    const taskId = Number(req.params.taskId)

    await this.taskService.deleteTask({ id: taskId })

    res.status(204).send()
  }
}

export default TaskController
