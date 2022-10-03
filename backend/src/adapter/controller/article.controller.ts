import { NextFunction, Request, Response } from 'express'
import ArticleService from '../../application/services/article.service'
import ArticleRepositoryImpl from '../repository/article.repository.impl'

class ArticleController {
  private articleService: ArticleService
  constructor() {
    const articleRepository = new ArticleRepositoryImpl()
    this.articleService = new ArticleService(articleRepository)
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

  public async getArticles(req: Request, res: Response, next: NextFunction) {
    const articles = await this.articleService.getArticles()

    res.status(200).json({
      message: 'success get articles',
      articles,
    })
  }
}

export default ArticleController
