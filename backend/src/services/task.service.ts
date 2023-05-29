import { Task } from 'domain/task/task.entity'
import { TaskRepository } from 'domain/task/task.repository'
import { TaskCardRepository } from 'domain/taskCard/taskCard.repository'
import { CustomError } from 'global/utils'
import { CreateTaskDTO, UpdateTaskDTO } from 'types/task.dto'

class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private taskCardRepository: TaskCardRepository
  ) {}

  public async createTask({ content, date, time, task_card_id, parent_task_id }: CreateTaskDTO) {
    const taskCard = await this.taskCardRepository.getOne({ id: task_card_id })

    if (!taskCard) {
      throw new CustomError(404, 'not found task card')
    }

    if (parent_task_id) {
      const parentTask = await this.getTask({ id: parent_task_id })

      if (!parentTask) {
        throw new CustomError(404, 'not found parent task')
      }
      if (parentTask.task_card_id !== taskCard.id) {
        throw new CustomError(400, 'task card id should match task card id of parent task')
      }
    }

    return await this.taskRepository.create({ content, date, time, task_card_id, parent_task_id })
  }

  public async getTask({ id }: Pick<Task, 'id'>) {
    return await this.taskRepository.getOne({ id })
  }

  public async getTasks(taskCardId?: number) {
    return await this.taskRepository.getList(taskCardId)
  }

  public async updateTask(
    taskCardId: number,
    { content, date, time, completed_at, task_card_id, parent_task_id }: UpdateTaskDTO
  ) {
    const taskCard = await this.taskRepository.getOne({
      id: taskCardId,
    })

    if (!taskCard) {
      throw new CustomError(404, 'not found task')
    }

    return await this.taskRepository.updateOne(taskCardId, {
      content,
      date,
      time,
      completed_at,
      task_card_id,
      parent_task_id,
    })
  }

  public async deleteTask({ id }: Pick<Task, 'id'>) {
    const task = await this.taskRepository.getOne({ id })

    if (!task) {
      throw new CustomError(404, 'Not found task')
    }

    return await this.taskRepository.deleteOne({ id })
  }
}

export default TaskService
