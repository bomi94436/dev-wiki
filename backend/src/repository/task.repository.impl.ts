import { Repository } from 'typeorm'
import dataSource from 'infra/mysql/dataSource'
import { TaskRepository } from 'domain/taskCard/task.repository'
import { Task } from 'domain/taskCard/task.entity'
import { CreateTaskDTO, UpdateTaskDTO } from 'types/task.dto'

class TaskRepositoryImpl implements TaskRepository {
  private repository: Repository<Task>

  constructor() {
    this.repository = dataSource.getRepository(Task)
  }

  public async create(data: CreateTaskDTO): Promise<Task> {
    return await this.repository.save(data)
  }

  public async getList(taskCardId?: number): Promise<Task[]> {
    const tasksQuery = this.repository
      .createQueryBuilder()
      .select(['t1'])
      .from(Task, 't1')
      .leftJoinAndMapMany('t1.sub_tasks', 'task', 't2', 't1.task_id = t2.parent_task_id')
      .leftJoinAndMapMany('t2.sub_tasks', 'task', 't3', 't2.task_id = t3.parent_task_id')
      .where('t1.parent_task_id IS NULL')

    if (taskCardId) {
      tasksQuery.andWhere('t1.task_card_id = :taskCardId', { taskCardId })
    }

    // .orderBy({
    //   't1.created_at': 'DESC',
    //   't2.created_at': 'DESC',
    //   't3.created_at': 'DESC',
    // })

    return await tasksQuery.getMany()
  }

  public async getOne({ id }: Pick<Task, 'id'>): Promise<Task | null> {
    return await this.repository.findOneBy({ id })
  }

  public async updateOne(taskId: number, data: UpdateTaskDTO): Promise<Task | null> {
    const result = await this.repository.update(taskId, data)

    if (result) {
      return await this.getOne({ id: taskId })
    } else {
      return null
    }
  }

  public async deleteOne({ id }: Pick<Task, 'id'>): Promise<void> {
    await this.repository.delete({ id })
  }
}

export default TaskRepositoryImpl
