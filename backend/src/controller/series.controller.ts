import { RequestHandler } from 'express'
import { ItemResponse, ItemsResponse } from './types'
import SeriesRepositoryImpl from 'repository/series.repository.impl'
import SeriesService from 'services/series.service'
import { Series } from 'domain/series/series.entity'
import { PageParam } from 'global/type'

class SeriesController {
  private seriesService: SeriesService
  constructor() {
    const seriesRepository = new SeriesRepositoryImpl()
    this.seriesService = new SeriesService(seriesRepository)
  }

  public createSeries: RequestHandler<{}, ItemResponse<Series>> = async (req, res) => {
    const series = await this.seriesService.createSeries({
      ...req.body,
      created_by_id: req.session.userid,
    })

    res.status(201).json(series)
  }

  public getSeriesList: RequestHandler<
    Partial<Pick<Series, 'name'>> & PageParam,
    ItemsResponse<Series>
  > = async (req, res) => {
    const result = await this.seriesService.getSeriesList({
      ...req.query,
      created_by_id: req.session.userid,
    })

    res.status(200).json(result)
  }
}

export default SeriesController
