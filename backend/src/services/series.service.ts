import { Series } from 'domain/series/series.entity'
import { SeriesRepository } from 'domain/series/series.repository'
import { PageParam } from 'global/type'
import { CustomError } from 'global/utils'

class SeriesService {
  constructor(private seriesRepository: SeriesRepository) {}

  public async createSeries({ name, created_by_id }: Parameters<SeriesRepository['create']>[0]) {
    return await this.seriesRepository.create({ name, created_by_id })
  }

  public async getSeriesList({
    name,
    created_by_id,
    page,
    page_size,
  }: Partial<Pick<Series, 'name' | 'created_by_id'>> & PageParam) {
    return await this.seriesRepository.getList({ name, created_by_id, page, page_size })
  }

  public async updateSeries(seriesId: number, data: Partial<Pick<Series, 'name'>>) {
    const series = await this.seriesRepository.getOne({ id: seriesId })
    if (!series) {
      throw new CustomError(404, 'Not found series')
    }

    return await this.seriesRepository.updateOne(seriesId, data)
  }

  public async deleteSeries(seriesId: number) {
    const series = await this.seriesRepository.getOne({ id: seriesId })

    if (!series) {
      throw new CustomError(404, 'Not found series')
    }

    return await this.seriesRepository.deleteOne(seriesId)
  }
}

export default SeriesService
