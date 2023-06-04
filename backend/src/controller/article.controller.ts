import { RequestHandler } from 'express'

import { Article } from 'domain/article/article.entity'
import ArticleRepositoryImpl from 'repository/article.repository.impl'
import ArticleHistoryRepositoryImpl from 'repository/articleHistory.repository.impl'
import ArticleService from 'services/article.service'
import { ItemsResponse, ItemResponse } from './types'
import { PageParam } from 'global/type'

interface ArticleReqParams {
  articleId?: number
}

type GetMyArticlesReqParams = Partial<
  Pick<Article, 'title' | 'content' | 'thumbnail' | 'short_description' | 'id'>
> &
  PageParam

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
      created_by_id: req.session.userid,
    })

    res.status(201).json(article)
  }

  public getMyArticles: RequestHandler<GetMyArticlesReqParams, ItemsResponse<Article>> = async (
    req,
    res
  ) => {
    const result = await this.articleService.getArticles({
      ...req.query,
      created_by_id: req.session.userid,
    })

    res.status(200).json(result)
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

    res.status(204).send()
  }
}

export default ArticleController
