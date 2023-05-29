import { TaskCard } from 'domain/taskCard/taskCard.entity'
import { TaskCardRepository } from 'domain/taskCard/taskCard.repository'
import { PageParam } from 'global/type'
import { CustomError } from 'global/utils'

class TaskCardService {
  constructor(private taskCardRepository: TaskCardRepository) {}

  public async createTaskCard(taskCard: Pick<TaskCard, 'name' | 'description'>) {
    return await this.taskCardRepository.create(taskCard)
  }

  public async getTaskCards({
    name,
    description,
    is_closed,
    page,
    page_size,
  }: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>> & PageParam) {
    return await this.taskCardRepository.getList({
      name,
      description,
      is_closed,
      page,
      page_size,
    })
  }

  public async getTaskCard({ id }: Pick<TaskCard, 'id'>) {
    return await this.taskCardRepository.getOne({ id })
  }

  public async updateTaskCard(
    taskCardId: number,
    { name, description, is_closed }: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
  ) {
    const taskCard = await this.taskCardRepository.getOne({
      id: taskCardId,
    })

    if (!taskCard) {
      throw new CustomError(404, 'not found task card')
    }

    return await this.taskCardRepository.updateOne(taskCardId, { name, description, is_closed })
  }

  public async deleteTaskCard({ id }: Pick<TaskCard, 'id'>) {
    const taskCard = await this.taskCardRepository.getOne({ id })

    if (!taskCard) {
      throw new CustomError(404, 'Not found task card')
    }

    return await this.taskCardRepository.deleteOne({ id })
  }
}

export default TaskCardService
