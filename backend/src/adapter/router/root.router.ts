import express from 'express'
import { rootController } from '../controller'
import { asyncMiddleware } from '../../global/utils'

const rootRouter = express.Router()

rootRouter.get('/', asyncMiddleware(rootController.healthCheck))

export default rootRouter
