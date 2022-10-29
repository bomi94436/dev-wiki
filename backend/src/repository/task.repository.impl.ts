import { Repository } from 'typeorm'
import dataSource from 'infra/mysql/dataSource'
import { TaskRepository } from 'domain/taskCard/task.repository'
import { Task } from 'domain/taskCard/task.entity'

class TaskRepositoryImpl implements TaskRepository {
  private taskRepository: Repository<Task>

  constructor() {
    this.taskRepository = dataSource.getRepository(Task)
  }

  public async getList(taskCardId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        task_card_id: taskCardId,
      },
      relations: {
        tasks: true,
      },
    })
  }
}

export default TaskRepositoryImpl
