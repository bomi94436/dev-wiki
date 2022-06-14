import express from 'express'
import { rootController } from '../controllers'
import { asyncMiddleware } from '../utils'

const rootRouter = express.Router()

rootRouter.get('/', asyncMiddleware(rootController.healthCheck))

export default rootRouter
