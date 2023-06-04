import { PageParam, PaginationResult, Result } from 'global/type'
import { Article } from './article.entity'

export interface ArticleRepository {
  create(
    article: Pick<
      Article,
      'title' | 'content' | 'thumbnail' | 'short_description' | 'created_by_id'
    >
  ): Promise<Article>
  getList(
    option?: Partial<
      Pick<Article, 'title' | 'content' | 'thumbnail' | 'short_description' | 'created_by_id'>
    > &
      PageParam
  ): Promise<Result<Article> | PaginationResult<Article>>
  getOne(article: Pick<Article, 'id'>): Promise<Article | null>
  updateOne(articleId: number, article: Article): Promise<Article | null>
  deleteOne(articleId: number): Promise<void>
}
