import { Article } from 'domain/article/article.entity'
import { ArticleRepository } from 'domain/article/article.repository'
import { ArticleHistory } from 'domain/article/articleHistory.entity'
import { ArticleHistoryRepository } from 'domain/article/articleHistory.repository'
import { CustomError } from 'global/utils'

class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private articleHistoryRepository: ArticleHistoryRepository
  ) {}

  public async createArticle({
    title,
    content,
    thumbnail,
    short_description,
    writer_id,
  }: {
    title: string
    thumbnail?: string
    short_description?: string
    content: string
    writer_id: string
  }) {
    const article = new Article({
      title,
      content,
      thumbnail,
      short_description,
      writer_id,
    })

    return await this.articleRepository.create(article)
  }

  public async getArticles(
    option?: Partial<
      Pick<Article, 'title' | 'content' | 'thumbnail' | 'short_description' | 'writer_id' | 'id'>
    >
  ) {
    return await this.articleRepository.getList(option)
  }

  public async getArticle(id: number) {
    const article = await this.articleRepository.getOne({ id })

    if (article) {
      article.increaseMyViews()
      return this.articleRepository.updateOne(id, article)
    } else {
      return null
    }
  }

  public async updateArticle(
    articleId: number,
    data: Pick<Article, 'title' | 'thumbnail' | 'short_description' | 'content'>
  ) {
    const article = await this.articleRepository.getOne({ id: articleId })

    if (!article) {
      throw new CustomError(404, 'Not found article')
    }

    const articleHistory = new ArticleHistory({
      ...article,
      article_id: articleId,
    })
    await this.articleHistoryRepository.create(articleHistory)

    const updateArticle = new Article(data)
    return await this.articleRepository.updateOne(articleId, updateArticle)
  }

  public async deleteArticle(articleId: number) {
    const article = await this.articleRepository.getOne({ id: articleId })

    if (!article) {
      throw new CustomError(404, 'Not found article')
    }

    return await this.articleRepository.deleteOne(articleId)
  }
}

export default ArticleService
