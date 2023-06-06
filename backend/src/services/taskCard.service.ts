import { TaskCard } from 'domain/taskCard/taskCard.entity'
import { TaskCardRepository } from 'domain/taskCard/taskCard.repository'
import { PageParam } from 'global/type'
import { CustomError } from 'global/utils'

class TaskCardService {
  constructor(private taskCardRepository: TaskCardRepository) {}

  public async createTaskCard({
    name,
    description,
    created_by_id,
  }: Parameters<TaskCardRepository['create']>[0]) {
    return await this.taskCardRepository.create({ name, description, created_by_id })
  }

  public async getTaskCards({
    name,
    description,
    is_closed,
    created_by_id,
    page,
    page_size,
  }: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed' | 'created_by_id'>> & PageParam) {
    return await this.taskCardRepository.getList({
      name,
      description,
      is_closed,
      created_by_id,
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
