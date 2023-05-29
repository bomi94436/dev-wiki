import dataSource from '../infra/mysql/dataSource'
import { Like, Repository } from 'typeorm'
import { ArticleRepository } from 'domain/article/article.repository'
import { Article } from 'domain/article/article.entity'
import { PaginationResult, Result } from 'global/type'
import { paginate } from 'global/utils'

class ArticleRepositoryImpl implements ArticleRepository {
  private repository: Repository<Article>

  constructor() {
    this.repository = dataSource.getRepository(Article)
  }

  public async create(article: Article) {
    return await this.repository.save(article)
  }

  public async getList(
    option?: Parameters<ArticleRepository['getList']>[0]
  ): Promise<Result<Article> | PaginationResult<Article>> {
    const query = this.repository.createQueryBuilder('article')

    if (option?.title) {
      query.where({ title: Like(`%${option.title}%`) })
    }
    if (option?.content) {
      query.where({ content: Like(`%${option.content}%`) })
    }
    if (option?.thumbnail) {
      query.where({ thumbnail: option.thumbnail })
    }
    if (option?.short_description) {
      query.where({ short_description: Like(`%${option.short_description}%`) })
    }
    if (option?.writer_id) {
      query.where({ writer_id: option.writer_id })
    }

    if (option?.page) {
      return await paginate<Article>({ query, page: option.page, page_size: option.page_size })
    }

    return {
      items: await query.getMany(),
    }
  }

  public async getOne({ id }: Article): Promise<Article | null> {
    return await this.repository.findOneBy({
      id,
    })
  }

  public async updateOne(articleId: number, article: Article) {
    const result = await this.repository.update(articleId, article)

    if (result) {
      return await this.repository.findOneBy({
        id: articleId,
      })
    } else {
      return null
    }
  }

  public async deleteOne(articleId: number) {
    await this.repository.delete(articleId)
  }
}

export default ArticleRepositoryImpl
