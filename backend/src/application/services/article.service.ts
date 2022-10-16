import { Article } from '../../domain/article/article.entity'
import { ArticleRepository } from '../../domain/article/article.repository'
import { ArticleHistoryRepository } from '../../domain/article/articleHistory.repository'
import { CustomError } from '../../global/utils'

class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private articleHistoryRepository: ArticleHistoryRepository
  ) {}

  public async createArticle({
    title,
    content,
    writerId,
  }: {
    title: string
    content: string
    writerId: string
  }) {
    return await this.articleRepository.create({ title, content, writer_id: writerId })
  }

  public async getArticles(option?: Partial<Article>) {
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

    await this.articleHistoryRepository.create({
      title: article.title,
      thumbnail: article.thumbnail,
      short_description: article.short_description,
      content: article.content,
      article_id: articleId,
    })
    return await this.articleRepository.updateOne(articleId, data)
  }
}

export default ArticleService
