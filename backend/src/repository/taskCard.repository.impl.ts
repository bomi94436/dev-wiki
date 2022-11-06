import { Like, Repository } from 'typeorm'
import { TaskCard } from 'domain/taskCard/taskCard.entity'
import { TaskCardRepository } from 'domain/taskCard/taskCard.repository'
import dataSource from 'infra/mysql/dataSource'
import { reduceObject } from 'global/utils'

class TaskCardRepositoryImpl implements TaskCardRepository {
  private repository: Repository<TaskCard>

  constructor() {
    this.repository = dataSource.getRepository(TaskCard)
  }

  public async create(taskCard: Pick<TaskCard, 'name' | 'description'>): Promise<TaskCard> {
    return await this.repository.save(taskCard)
  }

  public async getList(
    findOption?: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
  ): Promise<TaskCard[]> {
    const taskCardQuery = this.repository
      .createQueryBuilder('task_card')
      .select()
      .leftJoinAndSelect('task_card.tasks', 'Task')
      .where(
        reduceObject({
          ...findOption,
          name: findOption?.name ? Like(`%${findOption.name}%`) : undefined,
          description: findOption?.description ? Like(`%${findOption.description}%`) : undefined,
        })
      )

    return taskCardQuery.getMany()
  }

  public async getOne({ id }: Pick<TaskCard, 'id'>): Promise<TaskCard | null> {
    return await this.repository.findOneBy({
      id,
    })
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
