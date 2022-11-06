import { TaskCard } from './taskCard.entity'

export interface TaskCardRepository {
  create(data: Pick<TaskCard, 'name' | 'description'>): Promise<TaskCard>
  getList(
    findOption?: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
  ): Promise<TaskCard[]>
  getOne({ id }: Pick<TaskCard, 'id'>): Promise<TaskCard | null>
  updateOne(
    taskCardId: number,
    data: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
  ): Promise<TaskCard | null>
  deleteOne({ id }: Pick<TaskCard, 'id'>): Promise<void>
}
