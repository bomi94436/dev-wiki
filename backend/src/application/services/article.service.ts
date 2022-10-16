import { FindManyOptions } from 'typeorm'
import { Article } from '../../domain/article/article.entity'
import { ArticleRepository } from '../../domain/article/article.repository'

class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

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
    return await this.articleRepository.updateOne(articleId, data)
  }
}

export default ArticleService
