import { Task } from 'domain/taskCard/task.entity'
import { CreateTaskDTO, UpdateTaskDTO } from 'types/task.dto'

export interface TaskRepository {
  create(data: CreateTaskDTO): Promise<Task>
  getList(taskId?: number): Promise<Task[]>
  getOne({ id }: Pick<Task, 'id'>): Promise<Task | null>
  updateOne(taskId: number, data: UpdateTaskDTO): Promise<Task | null>
  deleteOne({ id }: Pick<Task, 'id'>): Promise<void>
}
