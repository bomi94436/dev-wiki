import { TaskCard } from 'domain/taskCard/taskCard.entity'
import { TaskCardRepository } from 'domain/taskCard/taskCard.repository'

class TaskCardService {
  constructor(private taskCardRepository: TaskCardRepository) {}

  public async createTaskCard(taskCard: Pick<TaskCard, 'name' | 'description'>) {
    return await this.taskCardRepository.create(taskCard)
  }

  public async getTaskCards(
    findOption?: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
  ) {
    return await this.taskCardRepository.getList({
      name: findOption?.name,
      description: findOption?.description,
      is_closed: findOption?.is_closed,
    })
  }

  public async getTaskCard({ id }: Pick<TaskCard, 'id'>) {
    return await this.taskCardRepository.getOne({ id })
  }
}

export default TaskCardService
