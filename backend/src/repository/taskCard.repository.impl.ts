import { Like, Repository } from 'typeorm'
import { TaskCard } from 'domain/taskCard/taskCard.entity'
import { TaskCardRepository } from 'domain/taskCard/taskCard.repository'
import dataSource from 'infra/mysql/dataSource'
import { paginate } from 'global/utils'
import { PaginationResult, Result } from 'global/type'

class TaskCardRepositoryImpl implements TaskCardRepository {
  private repository: Repository<TaskCard>

  constructor() {
    this.repository = dataSource.getRepository(TaskCard)
  }

  public async create(taskCard: Pick<TaskCard, 'name' | 'description'>): Promise<TaskCard> {
    return await this.repository.save(taskCard)
  }

  public async getList(
    option?: Parameters<TaskCardRepository['getList']>[0]
  ): Promise<Result<TaskCard> | PaginationResult<TaskCard>> {
    const query = this.repository
      .createQueryBuilder('task_card')
      .leftJoinAndSelect('task_card.tasks', 'Task')

    if (option?.name) {
      query.where({ name: Like(`%${option.name}%`) })
    }
    if (option?.description) {
      query.where({ description: Like(`%${option.description}%`) })
    }
    if (option?.created_by_id) {
      query.where({ created_by_id: option.created_by_id })
    }

    if (option?.page) {
      return await paginate<TaskCard>({ query, page: option.page, page_size: option.page_size })
    }

    return {
      items: await query.getMany(),
    }
  }

  public async getOne({ id }: Pick<TaskCard, 'id'>): Promise<TaskCard | null> {
    return await this.repository
      .createQueryBuilder('task_card')
      .leftJoinAndSelect('task_card.tasks', 'Task')
      .where({ id })
      .getOne()
  }

  public async updateOne(
    taskCardId: number,
    data: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
  ): Promise<TaskCard | null> {
    const result = await this.repository.update(taskCardId, data)

    if (result) {
      return await this.repository.findOneBy({
        id: taskCardId,
      })
    } else {
      return null
    }
  }

  public async deleteOne({ id }: Pick<TaskCard, 'id'>) {
    await this.repository.delete({ id })
  }
}

export default TaskCardRepositoryImpl
