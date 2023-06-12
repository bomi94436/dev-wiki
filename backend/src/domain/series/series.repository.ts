import { Series } from './series.entity'

export interface SeriesRepository {
  create(series: Pick<Series, 'name' | 'created_by_id'>): Promise<Series>
}
