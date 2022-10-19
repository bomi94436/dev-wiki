import { FindOptionsWhere } from 'typeorm'
import { Article } from '../../domain/article/article.entity'
import { ArticleRepository } from '../../domain/article/article.repository'
import { ArticleHistoryRepository } from '../../domain/article/articleHistory.repository'
import { CustomError } from '../../global/utils'
import { ArticleHistory } from '../../domain/article/articleHistory.entity'

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
    writerId,
  }: {
    title: string
    thumbnail?: string
    short_description?: string
    content: string
    writerId: string
  }) {
    const article = new Article({
      title,
      content,
      thumbnail,
      short_description,
      writer_id: writerId,
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
    return await this.articleRepository.getOne({ id })
  }

  public async updateArticle(
    articleId: number,
    data: Pick<Article, 'title' | 'thumbnail' | 'short_description' | 'content'>
  ) {
    const article = await this.getArticle(articleId)

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
    const article = await this.getArticle(articleId)

    if (!article) {
      throw new CustomError(404, 'Not found article')
    }

    return await this.articleRepository.deleteOne(articleId)
  }
}

export default ArticleService
