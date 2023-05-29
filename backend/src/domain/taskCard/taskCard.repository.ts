import { PageParam, PaginationResult, Result } from 'global/type'
import { TaskCard } from './taskCard.entity'

export interface TaskCardRepository {
  create(data: Pick<TaskCard, 'name' | 'description'>): Promise<TaskCard>
  getList(
    option?: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>> & PageParam
  ): Promise<Result<TaskCard> | PaginationResult<TaskCard>>
  getOne({ id }: Pick<TaskCard, 'id'>): Promise<TaskCard | null>
  updateOne(
    taskCardId: number,
    data: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
  ): Promise<TaskCard | null>
  deleteOne({ id }: Pick<TaskCard, 'id'>): Promise<void>
}
