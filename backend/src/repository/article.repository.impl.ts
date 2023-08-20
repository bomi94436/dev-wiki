import { Like, Repository } from 'typeorm'
import dataSource from 'infra/mysql/dataSource'
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
    const query = this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.series', 'series')

    if (option?.title) {
      query.andWhere({ title: Like(`%${option.title}%`) })
    }
    if (option?.content) {
      query.andWhere({ content: Like(`%${option.content}%`) })
    }
    if (option?.short_description) {
      query.andWhere({ short_description: Like(`%${option.short_description}%`) })
    }
    if (option?.series_id) {
      query.andWhere({ series_id: option.series_id })
    }
    if (option?.created_by_id) {
      query.andWhere({ created_by_id: option.created_by_id })
    }

    if (option?.page) {
      return await paginate<Article>({ query, page: option.page, page_size: option.page_size })
    }

    return {
      items: await query.getMany(),
    }
  }

  public async getOne({ id }: Article): Promise<Article | null> {
    const query = this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.series', 'series')

    return await query.where({ id }).getOne()
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
