import { Like, Repository } from 'typeorm'
import dataSource from 'infra/mysql/dataSource'
import { Series } from 'domain/series/series.entity'
import { SeriesRepository } from 'domain/series/series.repository'
import { Result, PaginationResult } from 'global/type'
import { paginate } from 'global/utils'

class SeriesRepositoryImpl implements SeriesRepository {
  private repository: Repository<Series>
  constructor() {
    this.repository = dataSource.getRepository(Series)
  }

  public async create(series: Pick<Series, 'name' | 'created_by_id'>): Promise<Series> {
    return await this.repository.save(series)
  }

  public async getList(
    option?: Parameters<SeriesRepository['getList']>[0]
  ): Promise<Result<Series> | PaginationResult<Series>> {
    const query = this.repository.createQueryBuilder('series')

    if (option?.name) {
      query.andWhere({ name: Like(`%${option.name}%`) })
    }
    if (option?.created_by_id) {
      query.andWhere({ created_by_id: option.created_by_id })
    }
    if (option?.page) {
      return await paginate<Series>({ query, page: option.page, page_size: option.page_size })
    }

    return {
      items: await query.getMany(),
    }
  }
}

export default SeriesRepositoryImpl
