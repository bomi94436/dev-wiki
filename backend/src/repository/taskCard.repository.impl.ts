import { Like, Repository } from 'typeorm'
import { TaskCard } from 'domain/taskCard/taskCard.entity'
import { TaskCardRepository } from 'domain/taskCard/taskCard.repository'
import dataSource from 'infra/mysql/dataSource'

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
    return await this.repository.find({
      where: {
        ...findOption,
        name: findOption?.name ? Like(`%${findOption.name}%`) : undefined,
        description: findOption?.description ? Like(`%${findOption.description}%`) : undefined,
      },
    })
  }
}

export default TaskCardRepositoryImpl
