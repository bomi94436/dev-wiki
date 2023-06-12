import { SeriesRepository } from 'domain/series/series.repository'

class SeriesService {
  constructor(private seriesRepository: SeriesRepository) {}

  public async createSeries({ name, created_by_id }: Parameters<SeriesRepository['create']>[0]) {
    return await this.seriesRepository.create({ name, created_by_id })
  }
}

export default SeriesService
