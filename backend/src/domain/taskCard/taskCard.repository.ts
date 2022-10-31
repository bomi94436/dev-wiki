import { TaskCard } from './taskCard.entity'

export interface TaskCardRepository {
  create(data: Pick<TaskCard, 'name' | 'description'>): Promise<TaskCard>
  getList(
    findOption?: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
  ): Promise<TaskCard[]>
}
