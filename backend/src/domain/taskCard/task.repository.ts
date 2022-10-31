import { Task } from 'domain/taskCard/task.entity'

export interface TaskRepository {
  getList(taskCardId?: number): Promise<Task[]>
}
