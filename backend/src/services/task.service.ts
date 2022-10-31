import { TaskRepository } from 'domain/taskCard/task.repository'

class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  public async getTasks(taskCardId?: number) {
    return await this.taskRepository.getList(taskCardId)
  }
}

export default TaskService
