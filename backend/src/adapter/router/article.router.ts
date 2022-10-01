import express from 'express'
import ArticleController from '../controller/article.controller'
import { asyncMiddleware } from '../../global/utils'

const articleRouter = express.Router()
const articleController = new ArticleController()

articleRouter.get(
  '/',
  asyncMiddleware((req, res, next) => articleController.getArticles(req, res, next))
)

articleRouter.post(
  '/',
  asyncMiddleware((req, res, next) => articleController.createArticle(req, res, next))
)

export default articleRouter
