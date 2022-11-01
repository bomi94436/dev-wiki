import express from 'express'
import ArticleController from 'controller/article.controller'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { asyncMiddleware } from 'global/utils'
import articleValidator from 'middleware/vaildator/article.validator'

const articleRouter = express.Router()
const articleController = new ArticleController()

articleRouter.get('/', checkIsLoggedInUser, asyncMiddleware(articleController.getMyArticles))

articleRouter.get('/:articleId', checkIsLoggedInUser, asyncMiddleware(articleController.getArticle))

articleRouter.post(
  '/',
  checkIsLoggedInUser,
  articleValidator.create,
  asyncMiddleware(articleController.createArticle)
)

articleRouter.patch(
  '/:articleId',
  checkIsLoggedInUser,
  articleValidator.update,
  asyncMiddleware(articleController.updateArticle)
)

articleRouter.delete(
  '/:articleId',
  checkIsLoggedInUser,
  asyncMiddleware(articleController.deleteArticle)
)

export default articleRouter
