import express from 'express'
import { rootController } from '../controllers'
import { wrapAsync } from '../utils'

const rootRouter = express.Router()

rootRouter.get('/', wrapAsync(rootController.healthCheck))

export default rootRouter
