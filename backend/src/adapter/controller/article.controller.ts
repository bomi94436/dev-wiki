import { NextFunction, Request, RequestHandler, Response } from 'express'
import ArticleService from '../../application/services/article.service'
import ArticleRepositoryImpl from '../repository/article.repository.impl'
import ArticleHistoryRepositoryImpl from '../repository/articleHistory.repository.impl'

class ArticleController {
  private articleService: ArticleService
  constructor() {
    const articleRepository = new ArticleRepositoryImpl()
    const articleHistoryRepository = new ArticleHistoryRepositoryImpl()
    this.articleService = new ArticleService(articleRepository, articleHistoryRepository)
  }

  public async createArticle(req: Request, res: Response, next: NextFunction) {
    const article = await this.articleService.createArticle({
      ...req.body,
      writerId: req.session.userid,
    })

    res.status(201).json({
      message: 'success create article',
      article,
    })
  }

  public async getMyArticles(req: Request, res: Response, next: NextFunction) {
    // TODO: pagination
    const articles = await this.articleService.getArticles({
      writer_id: req.session.userid,
    })

    res.status(200).json({
      message: 'success get articles',
      articles,
    })
  }

  public async getArticle(req: Request, res: Response, next: NextFunction) {
    const articleId = Number(req.params.articleId)
    const article = await this.articleService.getArticle(articleId)

    if (article) {
      res.status(200).json({
        message: 'success get article',
        article,
      })
    } else {
      res.status(404).json({
        message: 'fail get article',
      })
    }
  }

  public updateArticle: RequestHandler = async (req, res, next) => {
    const articleId = Number(req.params.articleId)

    const article = await this.articleService.updateArticle(articleId, req.body)

    if (article) {
      res.status(200).json({
        message: 'success update article',
        article,
      })
    } else {
      res.status(400).json({
        message: 'fail update article',
      })
    }
  }
}

export default ArticleController
