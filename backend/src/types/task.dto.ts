import { Task } from 'domain/taskCard/task.entity'

export type CreateTaskDTO = Pick<
  Task,
  'content' | 'date' | 'time' | 'task_card_id' | 'parent_task_id'
>

export type UpdateTaskDTO = Partial<
  Pick<Task, 'content' | 'date' | 'time' | 'completed_at' | 'task_card_id' | 'parent_task_id'>
>
