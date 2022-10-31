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
    return await this.taskRepository
      .createQueryBuilder()
      .select(['t1'])
      .from(Task, 't1')
      .leftJoinAndMapMany('t1.tasks', 'task', 't2', 't1.task_id = t2.parent_task_id')
      .leftJoinAndMapMany('t2.tasks', 'task', 't3', 't2.task_id = t3.parent_task_id')
      .where('t1.parent_task_id IS NULL')
      .andWhere('t1.task_card_id = :taskCardId', { taskCardId })
      .orderBy({
        't1.created_at': 'DESC',
        't2.created_at': 'DESC',
        't3.created_at': 'DESC',
      })
      .getMany()
  }
}

export default TaskRepositoryImpl
