import { PageParam, PaginationResult, Result } from 'global/type'
import { Series } from './series.entity'

export interface SeriesRepository {
  create(series: Pick<Series, 'name' | 'created_by_id'>): Promise<Series>
  getList(
    option?: Partial<Pick<Series, 'name' | 'created_by_id'>> & PageParam
  ): Promise<Result<Series> | PaginationResult<Series>>
}
