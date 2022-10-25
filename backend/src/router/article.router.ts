import express from 'express'
import ArticleController from 'controller/article.controller'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'
import articleValidator from 'middleware/vaildator/article.validator'

const articleRouter = express.Router()
const articleController = new ArticleController()

articleRouter.get(
  '/',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => articleController.getMyArticles(req, res, next))
)

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

articleRouter.patch(
  '/:articleId',
  checkIsLoggedInUser,
  articleValidator.update,
  asyncMiddleware((req, res, next) => articleController.updateArticle(req, res, next))
)

articleRouter.delete(
  '/:articleId',
  checkIsLoggedInUser,
  asyncMiddleware((req, res, next) => articleController.deleteArticle(req, res, next))
)

export default articleRouter