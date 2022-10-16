import { FindManyOptions } from 'typeorm'
import { Article } from './article.entity'

export interface ArticleRepository {
  create(article: Pick<Article, 'title' | 'content' | 'writer_id'>): Promise<Article>
  getList(option?: FindManyOptions<Article>): Promise<Article[]>
  getOne(article: Pick<Article, 'id'>): Promise<Article | null>
}
