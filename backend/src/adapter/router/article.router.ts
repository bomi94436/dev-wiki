import express from 'express'
import ArticleController from '../controller/article.controller'
import { asyncMiddleware } from '../../global/utils'
import articleValidator from '../middleware/vaildator/article.validator'
import { checkIsLoggedInUser } from '../middleware/checkAuthentification'

const articleRouter = express.Router()
const articleController = new ArticleController()

articleRouter.get(
  '/',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => articleController.getMyArticles(req, res, next))
)

// TODO: validatte params articleId
articleRouter.get(
  '/:articleId',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => articleController.getArticle(req, res, next))
)

articleRouter.post(
  '/',
  checkIsLoggedInUser,
  articleValidator.create,
  asyncMiddleware((req, res, next) => articleController.createArticle(req, res, next))
)

// TODO: validatte params articleId, body
articleRouter.patch(
  '/:articleId',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => articleController.updateArticle(req, res, next))
)

export default articleRouter
