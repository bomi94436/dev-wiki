import express from 'express'
import { SeriesController } from 'controller'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'
import seriesValidator from 'middleware/vaildator/series.validator'

const seriesRouter = express.Router()
const seriesController = new SeriesController()

seriesRouter.get('/', checkIsLoggedInUser, asyncMiddleware(seriesController.getSeriesList))

seriesRouter.post(
  '/',
  checkIsLoggedInUser,
  seriesValidator.create,
  asyncMiddleware(seriesController.createSeries)
)

export default seriesRouter
