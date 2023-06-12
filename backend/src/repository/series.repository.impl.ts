import { Repository } from 'typeorm'
import dataSource from 'infra/mysql/dataSource'
import { Series } from 'domain/series/series.entity'
import { SeriesRepository } from 'domain/series/series.repository'

class SeriesRepositoryImpl implements SeriesRepository {
  private repository: Repository<Series>
  constructor() {
    this.repository = dataSource.getRepository(Series)
  }

  public async create(series: Pick<Series, 'name' | 'created_by_id'>): Promise<Series> {
    return await this.repository.save(series)
  }
}

export default SeriesRepositoryImpl
