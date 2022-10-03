import express from 'express'
import ArticleController from '../controller/article.controller'
import { asyncMiddleware } from '../../global/utils'
import articleValidator from '../middleware/vaildator/article.validator'

const articleRouter = express.Router()
const articleController = new ArticleController()

articleRouter.get(
  '/',
  asyncMiddleware((req, res, next) => articleController.getArticles(req, res, next))
)

articleRouter.post(
  '/',
  articleValidator.create,
  asyncMiddleware((req, res, next) => articleController.createArticle(req, res, next))
)

export default articleRouter
