import { RequestHandler } from 'express'
import ArticleRepositoryImpl from 'repository/article.repository.impl'
import ArticleHistoryRepositoryImpl from 'repository/articleHistory.repository.impl'
import ArticleService from 'services/article.service'

class ArticleController {
  private articleService: ArticleService
  constructor() {
    const articleRepository = new ArticleRepositoryImpl()
    const articleHistoryRepository = new ArticleHistoryRepositoryImpl()
    this.articleService = new ArticleService(articleRepository, articleHistoryRepository)
  }

  public createArticle: RequestHandler = async (req, res, next) => {
    const article = await this.articleService.createArticle({
      ...req.body,
      writerId: req.session.userid,
    })

    res.status(201).json({
      message: 'success create article',
      article,
    })
  }

  public getMyArticles: RequestHandler = async (req, res, next) => {
    // TODO: pagination
    const articles = await this.articleService.getArticles({
      writer_id: req.session.userid,
    })

    res.status(200).json({
      message: 'success get articles',
      articles,
    })
  }

  public getArticle: RequestHandler = async (req, res, next) => {
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
      res.status(500).json({
        message: 'fail update article',
      })
    }
  }

  public deleteArticle: RequestHandler = async (req, res, next) => {
    const articleId = Number(req.params.articleId)

    await this.articleService.deleteArticle(articleId)

    res.status(200).json({
      message: 'success delete article',
      article_id: articleId,
    })
  }
}

export default ArticleController
