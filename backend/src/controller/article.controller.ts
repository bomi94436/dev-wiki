import { RequestHandler } from 'express'

import { Article } from 'domain/article/article.entity'
import ArticleRepositoryImpl from 'repository/article.repository.impl'
import ArticleHistoryRepositoryImpl from 'repository/articleHistory.repository.impl'
import ArticleService from 'services/article.service'
import { ItemsResponse, ItemResponse } from './types'

interface ArticleReqParams {
  articleId?: number
}

class ArticleController {
  private articleService: ArticleService
  constructor() {
    const articleRepository = new ArticleRepositoryImpl()
    const articleHistoryRepository = new ArticleHistoryRepositoryImpl()
    this.articleService = new ArticleService(articleRepository, articleHistoryRepository)
  }

  public createArticle: RequestHandler<{}, ItemResponse<Article>> = async (req, res) => {
    const article = await this.articleService.createArticle({
      ...req.body,
      writerId: req.session.userid,
    })

    res.status(201).json(article)
  }

  public getMyArticles: RequestHandler<{}, ItemsResponse<Article>> = async (req, res) => {
    // TODO: pagination
    const articles = await this.articleService.getArticles({
      writer_id: req.session.userid,
    })

    res.status(200).json({
      items: articles,
    })
  }

  public getArticle: RequestHandler<ArticleReqParams, ItemResponse<Article>> = async (req, res) => {
    const articleId = Number(req.params.articleId)
    const article = await this.articleService.getArticle(articleId)

    if (article) {
      res.status(200).json(article)
    } else {
      res.status(404).json({
        message: 'fail get article',
      })
    }
  }

  public updateArticle: RequestHandler<ArticleReqParams, ItemResponse<Article>> = async (
    req,
    res
  ) => {
    const articleId = Number(req.params.articleId)

    const article = await this.articleService.updateArticle(articleId, req.body)

    if (article) {
      res.status(200).json(article)
    } else {
      res.status(500).json({
        message: 'fail update article',
      })
    }
  }

  public deleteArticle: RequestHandler<ArticleReqParams> = async (req, res) => {
    const articleId = Number(req.params.articleId)

    await this.articleService.deleteArticle(articleId)

    res.status(204)
  }
}

export default ArticleController
